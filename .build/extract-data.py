#!/usr/bin/env python3
"""从 PepperCraft-MC 服务器数据中提取网站内容数据"""
import json, glob, os, sqlite3, subprocess

DATA_DIR = '/opt/docker/minecraft/mc/data'
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')
os.makedirs(OUT, exist_ok=True)

# ---- 1. 玩家名映射 (usercache + XConomy) ----
name_map = {}
with open(os.path.join(DATA_DIR, 'usercache.json')) as f:
    for u in json.load(f):
        name_map[u['uuid'].replace('-','').lower()] = u['name']

# XConomy 补充映射
try:
    conn = sqlite3.connect(os.path.join(DATA_DIR, 'plugins/XConomy/playerdata/data.db'))
    for row in conn.execute('SELECT UID, player FROM xconomy'):
        name_map[row[0].replace('-','').lower()] = row[1]
    conn.close()
except Exception as e:
    print('xconomy local:', e)

# ---- 2. 游戏时长统计 ----
stats = []
for f in glob.glob(os.path.join(DATA_DIR, 'world/players/stats/*.json')):
    try:
        with open(f) as fp:
            d = json.load(fp)
        c = d.get('stats', {}).get('minecraft:custom', {})
        u = os.path.basename(f)[:8]
        pt = c.get('minecraft:play_time', 0) / 3600
        stats.append({
            'name': name_map.get(u, u),
            'hours': round(pt, 1),
            'deaths': c.get('minecraft:deaths', 0),
            'kills': c.get('minecraft:player_kills', 0),
            'jumps': c.get('minecraft:jump', 0),
            'walk_km': round(c.get('minecraft:walk_one_cm', 0) / 100000, 1),
        })
    except Exception:
        pass
stats.sort(key=lambda x: -x['hours'])
# 去掉无名字的占位 UUID
players = [s for s in stats if not s['name'].startswith('00000000')]
with open(os.path.join(OUT, 'players.json'), 'w', encoding='utf-8') as f:
    json.dump({'leaderboard': players[:50], 'total_hours': round(sum(s['hours'] for s in players),1)}, f, ensure_ascii=False, indent=1)
print('players.json:', len(players), 'players, total', round(sum(s['hours'] for s in players),1), 'h')

# ---- 3. 财富榜 (MariaDB XConomy) ----
try:
    r = subprocess.run(['docker','exec','mariadb','mariadb','-u','Minecraft','-pPepperCraft1234!','XConomy','-N','-e',
        'SELECT player, balance FROM xconomy ORDER BY balance DESC LIMIT 30'],
        capture_output=True, text=True, timeout=30)
    wealth = []
    for line in r.stdout.strip().splitlines():
        if not line: continue
        p, b = line.split('\t')
        b = float(b)
        if b <= 0: continue
        wealth.append({'name': p, 'balance': b})
    with open(os.path.join(OUT, 'wealth.json'), 'w', encoding='utf-8') as f:
        json.dump(wealth, f, ensure_ascii=False, indent=1)
    print('wealth.json:', len(wealth))
except Exception as e:
    print('wealth err:', e)

# ---- 4. 城镇 (MariaDB HuskTowns) ----
try:
    r = subprocess.run(['docker','exec','mariadb','mariadb','-u','Minecraft','-pPepperCraft1234!','HuskTowns','-N','-e',
        'SELECT id, name FROM husktowns_town_data ORDER BY id'],
        capture_output=True, text=True, timeout=30)
    towns = []
    for line in r.stdout.strip().splitlines():
        if not line: continue
        tid, name = line.split('\t', 1)
        towns.append({'id': int(tid), 'name': name})
    with open(os.path.join(OUT, 'towns.json'), 'w', encoding='utf-8') as f:
        json.dump(towns, f, ensure_ascii=False, indent=1)
    print('towns.json:', len(towns))
except Exception as e:
    print('towns err:', e)

print('DONE')

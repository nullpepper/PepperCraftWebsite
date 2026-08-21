declare module 'fullpage.js' {
  interface FullPageOptions {
    licenseKey?: string
    navigation?: boolean
    navigationPosition?: string
    navigationTooltips?: string[]
    showActiveTooltip?: boolean
    keyboardScrolling?: boolean
    fitToSection?: boolean
    easing?: string
    easingcss3?: string
    lockAnchors?: boolean
    anchors?: string[]
    afterLoad?: (origin: any, destination: any) => void
    afterRender?: () => void
    [key: string]: any
  }

  class FullPage {
    constructor(selector: string, options?: FullPageOptions)
    moveTo(section: number | string, slide?: number): void
    silentMoveTo(section: number | string, slide?: number): void
    destroy(type?: string): void
    setAllowScrolling(allow: boolean): void
    setKeyboardScrolling(allow: boolean): void
    setFitToSection(fit: boolean): void
    getFullpageData(): any
  }

  export default FullPage
}

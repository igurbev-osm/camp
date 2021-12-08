const { BrowserView, MobileView } = require("react-device-detect");
const { default: Main } = require("./Main");

const DeviceSwitcher = () => {

    return (
        <>
            <BrowserView>
                <Main device="browser" />
            </BrowserView>
            <MobileView>
                <Main device="mobile" />
            </MobileView>
        </>
    );
}

export default DeviceSwitcher;
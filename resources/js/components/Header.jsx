function Header() {
    return (
        <>
            <div className="row text-center  mt-3 header">
                {/* <div className="col-md-4">

                </div> */}
                <div className="col-md-12 d-flex justify-content-between w-100 text-center">
                        <div className="img_wrapper">
                            <img src="./images/main_logo.png" alt="Main Image" className="main_logo" />
                        </div>
                        <a href="#"><h3>Embassy of the Federal Republic of Nigeria</h3><h4>Republic of Guinea</h4></a>
                        <div className="img_wrapper">
                            <img src="./images/sub_logo.png" alt="Main Image" className="sub_logo" />
                        </div>
                </div>
                {/* <div className="col-md-4">
                </div> */}
            </div>
        </>
    )
}

export default Header;
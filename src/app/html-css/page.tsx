"use client"

import {useState} from "react";

export default function HTML_CSS_STUDY() {

    const [dropdown, setDropDown] = useState(false)
    const [dropUp, setDropUp] = useState(false)
    const [nestDropDown, setNestDropDown] = useState(false)
    const [nestVerticalDropDown, setNestVerticalDropDown] = useState(false)

    const [inputDrop1, setInputDrop1] = useState(false)
    const [inputDrop2, setInputDrop2] = useState(false)
    const [inputDrop3, setInputDrop3] = useState(false)
    const [inputDrop4, setInputDrop4] = useState(false)

    const dropTitle = ["btn-default", "btn-primary", "btn-success", "btn-info", "btn-warning", "btn-danger"]


    return (
        <section className="flex flex-col gap-[20px] p-[40px]">

            <ul className="btn-group" style={{display : "flex" ,gap : "20px" }}>

                <div className="btn-group" role="group">
                    <button style={{ borderRadius : "8px" }}  type="button" className="btn btn-default ">공단기</button>
                </div>
                <div className="btn-group" role="group">
                    <button  style={{ borderRadius : "8px" }}  type="button" className="btn btn-default">세무관세단기</button>
                </div>
                <div className="btn-group" role="group">
                    <button style={{ borderRadius : "8px" }}  type="button" className="btn btn-default">사복단기</button>
                </div>

                <div className="btn-group" role="group">
                    <button style={{ borderRadius : "8px" }}  type="button" className="btn btn-default">기술계리단기</button>
                </div>
                <div className="btn-group" role="group">
                    <button style={{ borderRadius : "8px" }}  type="button" className="btn btn-default">군단기</button>
                </div>
                <div className="btn-group" role="group">
                    <button style={{ borderRadius : "8px" }}  type="button" className="btn btn-default">교행단기</button>
                </div>

                <div className="btn-group" role="group">
                    <button style={{ borderRadius : "8px" }}  type="button" className="btn btn-default">고용노동직/직업상담직</button>
                </div>
                <div className="btn-group" role="group">
                    <button style={{ borderRadius : "8px" }}  type="button" className="btn btn-default">간호보건단기</button>
                </div>
            </ul>


            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">@</span>
                <input type="text"
                       style={{ height : "100px", padding : "20px"}}
                       className="form-control box-content" placeholder="높이 100 패딩 20" aria-describedby="basic-addon1"/>
            </div>



            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>


            <div className="w-[300px]">
                <button type="button" className="btn btn-default" aria-label="Left Align">
                    <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                </button>

                <button type="button" className="btn btn-default btn-lg">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span> Star
                </button>
            </div>


            <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                Enter a valid email address
            </div>


            <div className="dropdown">
                <button
                    onClick={() => setDropDown(!dropdown)}
                    className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Dropdown
                    <span className="caret"></span>
                </button>
                <ul
                    style={{display: dropdown ? "block" : "none"}}
                    className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li className="dropdown-header">Dropdown header</li>
                    <li><a href="#">Action</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                    <li className="disabled"><a href="#">Disabled link</a></li>
                </ul>
            </div>


            <div className="dropup">
                <button
                    onClick={() => setDropUp(!dropUp)}
                    className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    DropUp
                    <span className="caret"></span>
                </button>
                <ul
                    style={{display: dropUp ? "block" : "none"}}
                    className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                </ul>
            </div>


            <ul className=" dropdown-menu-right" aria-labelledby="dLabel">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
            </ul>


            <div className="btn-group" role="group">
                <button type="button" className="btn btn-default">Left</button>
                <button type="button" className="btn btn-default">Middle</button>
                <button type="button" className="btn btn-default">Right</button>
            </div>


            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group" role="group" aria-label="First group">
                    <button type="button" className="btn btn-default">1</button>
                    <button type="button" className="btn btn-default">2</button>
                    <button type="button" className="btn btn-default">3</button>
                    <button type="button" className="btn btn-default">4</button>
                </div>
                <div className="btn-group" role="group" aria-label="Second group">
                    <button type="button" className="btn btn-default">5</button>
                    <button type="button" className="btn btn-default">6</button>
                    <button type="button" className="btn btn-default">7</button>
                </div>
                <div className="btn-group" role="group" aria-label="Third group">
                    <button type="button" className="btn btn-default">8</button>
                </div>
            </div>

            <div className="flex flex-col gap-[16px]">
                <div className="btn-group btn-group-lg" role="group" aria-label="...">
                    <button type="button" className="btn btn-default">big Left</button>
                    <button type="button" className="btn btn-default">big Middle</button>
                    <button type="button" className="btn btn-default">big Right</button>
                </div>
                <div className="btn-group btn-group-sm" role="group" aria-label="...">
                    <button type="button" className="btn btn-default">medium Left</button>
                    <button type="button" className="btn btn-default">medium Middle</button>
                    <button type="button" className="btn btn-default">medium Right</button>
                </div>
                <div className="btn-group btn-group-xs" role="group" aria-label="...">
                    <button type="button" className="btn btn-default">small Left</button>
                    <button type="button" className="btn btn-default">small Middle</button>
                    <button type="button" className="btn btn-default">small Right</button>
                </div>
            </div>


            <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-default">1</button>
                <button type="button" className="btn btn-default">2</button>

                <div className="btn-group" role="group">
                    <button
                        onClick={() => setNestDropDown(!nestDropDown)}
                        type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Dropdown
                        <span className="caret"></span>
                    </button>
                    <ul
                        style={{display: nestDropDown ? "block" : "none"}}
                        className="dropdown-menu">
                        <li><a href="#">Dropdown link</a></li>
                        <li><a href="#">Dropdown link</a></li>
                    </ul>
                </div>
            </div>


            <div className="btn-group-vertical w-[400px]" role="group" aria-label="...">
                <button type="button" className="btn btn-default">안녕</button>
                <button type="button" className="btn btn-default">안녕하세요</button>

                <div className="btn-group" role="group">
                    <button
                        onClick={() => setNestVerticalDropDown(!nestVerticalDropDown)}
                        type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Dropdown
                        <span className="caret"></span>
                    </button>
                    <ul
                        style={{display: nestVerticalDropDown ? "block" : "none"}}
                        className="dropdown-menu">
                        <li><a href="#">Dropdown link</a></li>
                        <li><a href="#">Dropdown link</a></li>
                    </ul>
                </div>
                <button type="button" className="btn btn-default">헬로우</button>
                <button type="button" className="btn btn-default">곤니찌와</button>
                <button type="button" className="btn btn-default">봉주르</button>
                <button type="button" className="btn btn-default">니하오</button>
            </div>


            <div className="flex gap-[20px]">
                {dropTitle.map((value, key) => (
                    <div className="flex" key={value}>
                        <div className="btn-group">
                            <button type="button" className={"btn dropdown-toggle " + value} data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                {value} <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" className="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>


            <div className="btn-group">
                <button className="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    Large button <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    ...
                </ul>
            </div>

            <div className="btn-group">
                <button className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    Small button <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    ...
                </ul>
            </div>

            <div className="btn-group">
                <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    Extra small button <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    ...
                </ul>
            </div>


            <div className="btn-group dropup">
                <button type="button" className="btn btn-default">Dropup</button>
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                </ul>
            </div>


            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">@</span>
                <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group">
                <input type="text" className="form-control" placeholder="Recipient's username"
                       aria-describedby="basic-addon2"/>
                <span className="input-group-addon" id="basic-addon2">@example.com</span>
            </div>

            <div className="input-group">
                <span className="input-group-addon">{`$`}</span>
                <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                <span className="input-group-addon">.00</span>
            </div>

            <label htmlFor="basic-url">Your vanity URL</label>
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon3">https://example.com/users/</span>
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
            </div>


            <div className="input-group input-group-lg">
                <span className="input-group-addon" id="sizing-addon1">@</span>
                <input type="text" className="form-control" placeholder="Username" aria-describedby="sizing-addon1"/>
            </div>

            <div className="input-group">
                <span className="input-group-addon" id="sizing-addon2">@</span>
                <input type="text" className="form-control" placeholder="Username" aria-describedby="sizing-addon2"/>
            </div>

            <div className="input-group input-group-sm">
                <span className="input-group-addon" id="sizing-addon3">@</span>
                <input type="text" className="form-control" placeholder="Username" aria-describedby="sizing-addon3"/>
            </div>


            <div className="flex w-full">
                <div className="col-lg-6">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <input type="checkbox" aria-label="..."/>
                      </span>
                        <input type="text" className="form-control" aria-label="..."/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <input type="radio" aria-label="..."/>
                      </span>
                        <input type="text" className="form-control" aria-label="..."/>
                    </div>
                </div>
            </div>


            <div className="flex w-full">
                <div className="col-lg-6">
                    <div className="input-group">
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Go!</button>
                      </span>
                        <input type="text" className="form-control" placeholder="Search for..."/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button">Go!</button>
                        </span>
                    </div>
                </div>
            </div>


            <div className="flex w-full">
                <div className="col-lg-6 flex-1">
                    <div className="input-group">
                        <div className="input-group-btn">
                            <button
                                onClick={() => setInputDrop1(!inputDrop1)}
                                type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">Action <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" style={{ display : inputDrop1 ? "block" : "none"}}>
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" className="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </div>
                        <input type="text" className="form-control" aria-label="..."/>
                    </div>
                </div>
                <div className="col-lg-6 flex-1">
                    <div className="input-group">
                        <input type="text" className="form-control" aria-label="..."/>
                            <div className="input-group-btn">
                                <button
                                    onClick={() => setInputDrop2(!inputDrop2)}
                                    type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">Action <span
                                    className="caret"></span></button>
                                <ul className="dropdown-menu dropdown-menu-right" style={{ display : inputDrop2 ? "block" : "none"}}>
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>


            <ul className="nav nav-tabs">
                <li role="presentation" className="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>


            <ul className="nav nav-pills">
                <li role="presentation" className="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>


            <ul className="nav nav-pills nav-stacked">
                <li role="presentation" className="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>


            <ul className="nav nav-tabs nav-justified">
                <li role="presentation" className="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>
            <ul className="nav nav-pills nav-justified">
                <li role="presentation" className="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>


            <ul className="nav nav-pills">
                <li role="presentation" className="active"><a href="#">Home</a></li>
                <li role="presentation" className="disabled"><a href="#">Disabled link</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>


            <ul className="nav nav-tabs">
                <li role="presentation" className="active"><a href="#">Home</a></li>
                <li role="presentation" className="dropdown">
                    <a
                        onClick={() => setInputDrop3(!inputDrop3)}
                        className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">
                        Dropdown <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu" style={{ display : inputDrop3 ? "block" : "none"}}>
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="#">Separated link</a></li>
                    </ul>
                </li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>


            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>

                    <div className="navbar-collapse" id="">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                            <li><a href="#">Link</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false">Dropdown <span
                                    className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="navbar-form navbar-left">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search"/>
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">Link</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false">Dropdown <span
                                    className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img alt="Brand"  className="w-[200px] h-[20px]" src="/vercel.svg"/>
                        </a>
                    </div>
                </div>
            </nav>

        </section>
    )
}

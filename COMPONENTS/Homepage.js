import React from "react";
import {Link} from "react-router-dom";

function Homepage()
{
    return(
        <div className = "homepage">
            <div className = "homepage_box_1">
                <div className = "homepage_box_1_1">
                    <h2>Phones</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo nunc,
                        convallis ut rutrum quis, varius in metus. Maecenas at urna mi. Ut blandit
                        quis velit eleifend viverra. Sed ac nulla ac nunc fermentum hendrerit vel quis neque.
                    </p>
                    <Link to = "/api/gadgets/phones/all" className = "btn link">Our Phones</Link>
                </div>
                <div className = "homepage_box_1_2">
                    <div>

                    </div>
                </div>
            </div>
            <div className = "homepage_box_2">
                <div className = "homepage_box_2_2">
                    <div>

                    </div>
                </div>
                <div className = "homepage_box_2_1">
                    <h2>Laptops</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo nunc,
                        convallis ut rutrum quis, varius in metus. Maecenas at urna mi. Ut blandit
                        quis velit eleifend viverra. Sed ac nulla ac nunc fermentum hendrerit vel quis neque.
                    </p>
                    <Link to = "/api/gadgets/phones/all" className = "btn link">Our Laptops</Link>
                </div>
            </div>
        </div>
    )
}
export default Homepage;
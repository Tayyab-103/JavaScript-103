<html>
    <head>
    <page-builder-block> 
        @php require_once 'app/general/__header__.tpl' @endphp
        <link rel="stylesheet" href="<?= $path['assets_css'] . '/app.css' ?>" />
        <span id="builderCssToken">
        </span>
        </page-builder-block> 
    </head>
    <body>
        @php perform_body_tag_open_actions(); @endphp
        <h1>Thank you!</h1>
        <p>Your Order ID is <b>@php echo $steps['1']['orderId'] @endphp</b></p>
        <table>
            <thead>
                <th>Order Details</th>
                <th></th>
            </thead>
            <tbody>
                <tr>
                    <td>Firstname</td>
                    <td>@php echo $customer['firstName'] @endphp</td>
                </tr>
                <tr>
                    <td>Lastname</td>
                    <td>@php echo $customer['lastName'] @endphp</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>@php echo $customer['phone'] @endphp</td>
                </tr>
                <tr>
                    <td>Email Address</td>
                    <td>@php echo $customer['email'] @endphp</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>@php echo $customer['shippingAddress1'] @endphp</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>@php echo $customer['shippingCity'] @endphp</td>
                </tr>
                <tr>
                    <td>Zip</td>
                    <td>@php echo $customer['shippingZip'] @endphp</td>
                </tr>
                <tr>
                    <td>State</td>
                    <td>@php echo $customer['shippingState'] @endphp</td>
                </tr>
                <tr>
                    <td>Country</td>
                    <td>@php echo $customer['shippingCountry'] @endphp</td>
                </tr>
            </tbody>
        </table>
        @php include 'app/general/__scripts__.tpl'; @endphp
		@php include 'app/general/__analytics__.tpl'; @endphp
        @php perform_body_tag_close_actions(); @endphp
    </body>
</html>

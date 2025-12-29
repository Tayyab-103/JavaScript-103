@php 
include("app/general/site.php")
@endphp
<html lang="en-US">
    <head>
    <link rel="shortcut icon" href="{{ $path['images'] }}/favicon.png" type="image/x-icon">
        <title>{{ $window_title }}</title>
        <page-builder-block> 
        @php require_once 'app/general/__header__.tpl' @endphp
        <meta charset="utf-8">
        
        <meta name="description" content="">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta http-equiv="content-type" content="text/html;charset=utf-8">
        <meta http-equiv="content-language" content="en-us">
        <meta name="HandheldFriendly" content="true">
        <meta name="viewport" content="width=device-width,user-scalable=no">
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="{{ $path['css'] }}/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="{{ $path['css'] }}/thank_you.css">
        <link rel="stylesheet" type="text/css" href="{{ $path['css'] }}/custom_new.css">

        <span id="builderCssToken">
        </span>
        </page-builder-block>
    </head>
    <body>
        @php perform_body_tag_open_actions(); @endphp
        <header class="site-header" id="header">
            <h1 class="site-header__title" data-lead-id="site-header-title">THANK YOU!</h1>
        </header>
        <div class="main-content">
            <i class="fa fa-check main-content__checkmark" id="checkmark"></i>
            <p class="main-content__body" data-lead-id="main-content-body">
                We have successfully received your entry for the draw.<br>
            </p>
            <p>Your Order ID is <b>@php echo $steps['1']['orderId'] @endphp</b></p>
            Please keep an eye on your inbox for your exclusive login details and FREE coupon codes.
            <p></p>
        </div>
        <footer class="site-footer" id="footer">
            <p class="site-footer__fineprint" id="fineprint">© Copyright {{ date('Y') }} {{ $copyright_name }} - All rights reserved.</p>
            <ul class="footer_links" style="display:none;">
                <li><a href="javascript:void(0);" onclick="javascript:openNewWindow('page-terms.php', 'modal')" ;="">Terms
                    &amp; Conditions</a> |
                </li>
                <li><a href="javascript:void(0);" onclick="javascript:openNewWindow('page-privacy.php', 'modal')"
                    ;="">Privacy Policy</a> |</li>
                <li><a href="javascript:void(0);" onclick="javascript:openNewWindow('page-contact.php', 'modal')"
                    ;="">Contact Us</a></li>
            </ul>
        </footer>

        @php include 'app/general/__scripts__.tpl'; @endphp
		@php include 'app/general/__analytics__.tpl'; @endphp
        @php perform_body_tag_close_actions(); @endphp
    </body>
</html>
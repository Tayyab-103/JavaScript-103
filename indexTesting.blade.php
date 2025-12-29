@php 
    include("app/general/site.php");
@endphp
<!DOCTYPE html>
<html>
    <head>
        <link rel="shortcut icon" href="{{ $path['images'] }}/favicon.png?v=0" type="image/x-icon">
        <title>{{ $window_title }}</title>
        <page-builder-block>
        @php require_once 'app/general/__header__.tpl' @endphp
        <meta charset="utf-8">
        <meta name="description" content="Consumer-prizes">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta http-equiv="content-type" content="text/html;charset=utf-8">
        <meta http-equiv="content-language" content="en-us">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="HandheldFriendly" content="true">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="author" content="">
        <meta property="og:title" content="{{ $product_name }}">
        <meta property="og:type" content="Webside">
        <meta property="og:site_name" content="{{ $offer_url }}">
        <meta property="og:description"
            content="Due to extremely high social media demand, there is a limited supply of {{ $product_name }} in stock as of">
        <meta property="og:image" content="{{ $og_image}}">
       <meta name="description" content="Due to extremely high social media demand, there is a limited supply of {{ $product_name }} in stock as of">
        <meta name="title" content="{{ $product_name }}">
        
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&amp;display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{{ $path['css'] }}/all.css">
        <link rel="stylesheet" type="text/css" href="{{ $path['css'] }}/animate.css">
        <link rel="stylesheet" type="text/css" href="{{ $path['css'] }}/custom.css">
        <!-- customization -->
        <link href="{{ $path['css'] }}/app2.css" rel="stylesheet" type="text/css">
        <link href="{{ $path['css'] }}/appear.css" rel="stylesheet" type="text/css">
        <link href="{{ $path['css'] }}/index.css?v=1" rel="stylesheet" type="text/css">
        <link href="{{ $path['css'] }}/font-awesome.css" media="all" rel="stylesheet">
        <link href="{{ $path['css'] }}/bootstrap.min.css" rel="stylesheet" type="text/css">
        <span id="builderCssToken">
        </span>
        </page-builder-block>
    </head>
    <body>
        @php perform_body_tag_open_actions(); @endphp
        <div class="loading_m text-center p-5">
            <h1>Hang on we have a huge rush of orders right now!!!</h1>
        </div>
        <section class="s9div">
            <div class="offerbar p-3">
                <div class="container1">
                    <h4 id="irvc3">Special Offer</h4>
                </div>
            </div>
            <div class="offerbaroftheday px-3 py-1"><span class="categoryText">
                Today's Offer <i class="fa fa-angle-right"></i>
                {{ $product_name }} </span>
            </div>
            <div class="offerbarexpire px-3 py-1">
                <i id="ik69k" class="fa fa-bell hidden-xs hidden-md"></i> Attention, this offer expires in:
                <div id="timer-12586003" data-gjs-type="Timer" data-gjs-sf-timer-seconds="270">
                    <span id="timer-container-12586003">04:20</span>
                    <script>
                        (function () {
                            const timer = document.getElementById('timer-container-12586003');
                            const seconds = document.getElementById('timer-12586003').dataset.gjsSfTimerSeconds || 0;
                            const endTime = Date.now() + (seconds * 1000);
                            
                            const refreshTimer = function () {
                                if (!timer) {
                                    return;
                                }
                                const currentTime = Date.now();
                                const timeLeft = endTime - currentTime;
                                
                                if (timeLeft > 0) {
                                    const timeLeftInSeconds = Math.floor(timeLeft / 1000);
                                    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
                                    const secondsLeft = timeLeftInSeconds % 60;

                                    
                                    const minutesText = minutesLeft < 10 ? ('0' + minutesLeft) : minutesLeft;
                                    const secondsText = secondsLeft < 10 ? ('0' + secondsLeft) : secondsLeft;

                                    // console.log(secondsText);
                        
                                    timer.innerText = minutesText + ':' + secondsText;
                                } else {
                                    timer.innerText = '00:00';
                                }
                            };
                            refreshTimer();
                            setInterval(refreshTimer, 999);
                        })()
                    </script>
                </div>
            </div>
            <div class="container-fluid pb-5">
                <div class="row bgx pt-5">
                    <div class="col-12 col-lg-4 s9pic text-center px-0 phone-wrap">
                        <div class="productContainer">
                            <!--<div class="badge_blue">
                                <img src="{{ $path['images'] }}/price-badge.png" class="product img-fluid price-us-1" width="200" height="200">
                                <div class="badge-text">PAY<br>ONLY<br><span class="pricetext">$7.95</span></div>
                            </div>-->
                            <img src="{{ $product_first_image }}" class="product img-fluid prod-img" width="509" height="584">
                        </div>
                    </div>
                    <div class="col-12 col-lg-4">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 col-12 ChooseSize d-md-none d-none">
                                    <div class="row d-none d-sm-block">
                                        <div class="col-md-12 col-sm-10 offset-sm-1 col-12">
                                            <h1>Apple 2021 iPad</h1>
                                            <span id="ikgb3">Get a chance to win the new 2021 iPad, Included in the
                                            MatchSpecialists trial</span>
                                        </div>
                                        <div
                                            class="col-md-12 col-sm-10 offset-sm-1 col-10 offset-xs-1 yellowText reviewStars">
                                            <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i class="fa fa-star-half-alt"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <h1 id="ivc3r">{{ $product_name }}
                                    </h1>
                                </div>
                                <div class="col-md-12">
                                    <hr>
                                </div>
                                <div class="col-md-12 col-12 col-sm-10 offset-sm-1 offset-0 offset-md-0 stock">
                                    <h3 class="orangeText" style="color: green;">
                                    <span class="amountInStock"><i class="fa fa-exclamation-circle"></i> </span> 
                                    <span id="stock_id">5</span> in stock
                                    </h3>
                                </div>
                                <div class="col-md-12 col-12 ChooseSize mb-4">
                                    <div class="row hidden-xs">
                                        <div class="col-md-12 descBullet">
                                            <ul>
                                                @foreach($first_product_desc_list as $list)
                                                <li>{!! $list !!}</li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4">
                        <div class="container">
                            <div class="intro-form">
                                <div class="form-group form-header">
                                    <div class="col-md-12">
                                        <h3 id="iwbdp">Fill Out Your Details:</h3>
                                    </div>
                                </div>
                                <div class="padding">
                                    <div class="form-group d-flex">
                                        <div id="i5uqd" class="col-12 colorName">
                                            <p class="blueBg">Color:</p>
                                            <span id="colorName" class="yellowBg"> </span>
                                        </div>
                                    </div>
                                    <div class="formdiv">
                                        <div class="lp-form-wrapper">
                                            <form method="post" action="ajax.php?method=new_prospect" name="prospect_form1" accept-charset="utf-8" enctype="application/x-www-form-urlencoded;charset=utf-8">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <input type="text" placeholder="First Name"
                                                                class="form-control required" name="firstName"
                                                                id="firstname1" value=""
                                                                data-error-message="Please enter your first name!">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <!-- <input type="text" class="form-control" id="first_name"> -->
                                                            <input type="text" name="lastName" id="lastname1"
                                                                placeholder="Last Name" class="form-control required"
                                                                value="" data-error-message="Please enter your last name!">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group select-field">
                                                            <!-- <input type="text" class="form-control" id="first_name"> -->
                                                            <select name="shippingCountry" class="form-control required"
                                                                id="country"
                                                                data-error-message="Please select your country!"
                                                                data-selected="US">
                                                                <option value="US">United States</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <!-- <input type="text" class="form-control" id="first_name"> -->
                                                            <input type="text" name="shippingAddress1" id="shippingAddress1"
                                                                placeholder="Your Address" class="form-control required"
                                                                data-error-message="Please enter your address!" value="">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <!-- <input type="text" class="form-control" id="first_name"> -->
                                                            <input value="" type="text" name="shippingAddress2"
                                                                id="shippingAddress2" placeholder="Apt / Suite #"
                                                                data-error-message="Please enter your address!"
                                                                class="form-control  ">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <input type="text" id="shippingZip1" data-group="1" name="shippingZip" placeholder="Zip / Postal" class="required form-control" value="" data-error-message="Please enter a valid zip code!" maxlength="5">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <input type="text" name="shippingCity" id="shippingCity1"
                                                                placeholder="Your City" class="required form-control"
                                                                value="" data-error-message="Please enter your city!">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group select-field">
                                                            <input type="text" name="shippingState" data-group="1" id="shippingState1" placeholder="Your State" class="required form-control" data-error-message="Please select your state!">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <!-- <input type="text" class="form-control" id="first_name"> -->
                                                            <input value="" type="email" name="email" id="email1"
                                                                class="required form-control" data-validate="email"
                                                                data-error-message="Please enter a valid email id!"
                                                                placeholder="Email Address">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <!-- <input type="text" class="form-control" id="first_name"> -->
                                                            <input type="tel" name="phone" id="phone1" placeholder="Phone"
                                                                class="required form-control" data-validate="phone"
                                                                data-min-length="10" data-max-length="10" maxlength="10"
                                                                minlength="10" value=""
                                                                data-error-message="Please enter a valid contact number!"
                                                                data-group="1"
                                                                oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="text-center" id="error_message"></div>
                                                <div class="text-center">
                                                    <button
                                                        class="btn btn-custom btn-primary btn-lg animated infinite pulse form_sub"
                                                        type="submit">Continue</button>
                                                    <p class="encrypted">Secure 256 Bit Encrypted Connection</p>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="row secure-signup">
                                            <div class="lp-form-secure"><img class="img-fluid" src="{{ $path['images'] }}/verified.png" width="1373" height="170">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <div class="container">
                <h2 class="sub-heading">{{ $product_name }}</h2>
                <p class="news">
                {{ $second_description }}
                </p>
                <img src="{{ $product_second_image }}" class="product img-fluid prod-img" width="1900" height="1064">
                <div class="footer-links mt-5">
                    <!-- <p style="font-size: 12px;text-align: justify;">CONGRATULATIONS! You are a winner of our exclusive Sweepstakes entry, in which you are automatically enrolled in our bonus prize draw where you could win one of many unbelievable prizes, including but not limited to: Samsung Galaxy, Apple iPad, Apple iPhone, Xbox, PlayStation, Dyson products & Gift Cards up to nine hundred dollars ($900) in value. Keep an eye on your email to see details of what you have won. No purchase or payment is necessary to enter our Sweepstakes. Must be 18+. Remember to read the terms and conditions and privacy policy after entry. Void where prohibited. Sign up for the best premium meal planning app on the next page. NOTE: We are not responsible for any reviews, reports, emails, advertisements or blogs that may have led you to this page. If you feel any of these 3rd party reviews, advertisements, blogs or reports may be inaccurate, please contact us immediately. We do not condone or endorse any inaccurate information, statistics and/or claims made by 3rd parties in regards to our product.</p>
                    <div style="position: absolute; overflow: hidden; width: 1px; height: 1px;">
                    </div>-->
                </div>
            </div>
        </footer>
        <div class="footerbtm">
           <div class="container">
                <p class="pt-3 text-center">Participate before it's too late!</p>

                <p class="copyright">
                    © Copyright {{ date('Y') }} {{ $copyright_name }} - All rights reserved.
                </p>
                <p class="customerservice">
                    Customer Service: <a href="tel:{{ $support_phone }}">{{ $support_phone }}</a>
                </p>
                <p class="footerlinks">
                    <a href="javascript:void(0);" onclick="javascript:openNewWindow('page-terms.php', 'modal')"
                        ;="">Terms &amp; Conditions</a> |
                    <a href="javascript:void(0);"
                        onclick="javascript:openNewWindow('page-privacy.php', 'modal')" ;="">Privacy Policy</a>
                    |
                    <a href="javascript:void(0);"
                        onclick="javascript:openNewWindow('page-contact.php', 'modal')" ;="">Contact Us</a>
                </p>
           </div>
        </div>
        <p id="loading-indicator" style="display:none;">Processing...</p>

        @php require_once 'app/general/__scripts__.tpl' @endphp
        @php require_once 'app/general/__analytics__.tpl' @endphp
        @php perform_body_tag_close_actions(); @endphp

        <script>
            $(document).ready(function(){
                var count = 0;
                const countertime = setInterval( ()=>{
                    count++;
                    if(count==3){
                        $("#stock_id").text(4)
                        $(".orangeText").css('color','orange')
                    }
                    if(count==6){
                        $("#stock_id").text(3)
                        $(".orangeText").css('color','red')
                    }

                    if(count > 6){
                        clearInterval(countertime);
                    }
                },1000); 
            })
        </script>
    </body>
</html>
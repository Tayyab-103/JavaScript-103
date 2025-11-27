@php 
include("app/general/site.php")
@endphp
<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="shortcut icon" href="{{ $path['images'] }}/favicon.png" type="image/x-icon">
        <title>{{ $window_title }}</title>
        <page-builder-block> 
            @php require_once 'app/general/__header__.tpl' @endphp
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
            <link rel="stylesheet" href="{{ $path['css'] }}/bootstrap.min.css">
            <link rel="stylesheet" href="{{ $path['css'] }}/confirm_style.css">
            <link rel="stylesheet" href="{{ $path['css'] }}/checkout-custom.css">
            <link rel="stylesheet" href="{{ $path['css'] }}/custom_new.css?v=1">

            <span id="builderCssToken">
            </span>
        </page-builder-block>
   </head>
   <body>
        @php perform_body_tag_open_actions(); @endphp
        <section class="checkout-main">
         <div class="topbar">
            <h2>{{ $product_name }}</h2>
         </div>
         <div class="container">   
            <div class="checkoutbox">
               <div class="row justify-content-between align-items-center">
                  <div class="col-md-12 d-block d-md-none mb-5">
                     <div class="limited-box" style="display:none;">
                        <p><span class="text1">LIMITED OFFER:</span> Receive An Additional
                                 <span class="text2">$2 OFF</span> When Paying With Mastercard.
                              </p>
                     </div>
                  </div>
                  <div class="col-md-6">
                     <div class="productimg">
                        <img src="{{ $badge_product_price_mc }}" id="mc_img" class="card-image" alt="Master Card">
                        <!--<div class="badge_blue">
                           <img src="{{ $path['images'] }}/price-badge.png" alt="badge" width="200" height="200">
                           <div class="badge-text">PAY<br>ONLY<br><span class="pricetext">${{ $product_price_visa }}</span></div>
                        </div>-->
                     </div>
                  </div>
                  <div class="col-md-6">
                     <div class="right-panel">
                        <div class="giftbox">
                           <!--<img src="/v4/app/desktop/images/congrats.png" class="img-fluid brand-logo" />
                              <h6 class="text-center mt-1" style="font-weight: 600;">Instant Access</h6>
                              <img src="/dailydeals/v2/ipp/app/desktop/images/cp_image.png" class="img-fluid brand-logo">-->
                           <div class="secured_logos1">
                              <img loading="lazy" src="{{ $path['images'] }}/card-sec.png" alt="Secured" title="Secured" style="margin:0px;" width="399" height="85">
                           </div>
                           <div class="limited-box">
                              <p><span class="text1">LIMITED OFFER:</span> Receive An Additional
                                 <span class="text2">$2 OFF</span> When Paying With Mastercard.
                              </p>
                           </div>
                           <div style="text-align:center;margin-bottom:5px">
                              <img src="{{ $path['images'] }}/mastercard.png" alt="card-logo" width="163px">
                           </div>
                           <p class="text-center mt-1 small">Congratulations! Enter your information below to pay <b class="top-price"><span id="main_price">${{ $product_price_mc }}</span></b>
                           </p>
                        </div>
                        <div class="toegang"></div>
                        <div id="alert" role="alert" hidden="" class="alert alert-danger">
                           <span class="sr-only">Error:</span>
                        </div>
                        <div id="status_window"></div>
                        <div id="err-block" class="error hidden"></div>
                        <form method="post" action="ajax.php?method=new_order_prospect" name="checkout_form" accept-charset="utf-8" enctype="application/x-www-form-urlencoded;charset=utf-8">
                           <input type="hidden" name="campaigns[0][id]" value="<?php echo $cb_campaign_id_visa; ?>" id="campaign_id">
                           <input type="hidden" name="forceGatewayId" id="gateway_id">
                           <div class="form-group" style="margin-bottom:5px;">
                              <!--<div class="div100 input-pad">
                                 <div class="limited-box">
                                   <p>
                                     <span class="text1">LIMITED OFFER:</span> Receive an additional <span class="text2">
                                       <b>$2 OFF</b>
                                     </span> when paying with Mastercard.
                                   </p>
                                 </div>
                                 </div>
                                 <div style="text-align:center;">
                                 <img src="/v4/app/desktop/images/mastercard.png?v=1" alt="card-logo" width="200">
                                 </div>-->
                           </div>
                           <div class="form-group">
                              <div class="div100 input-pad select-field">
                                 <!--<select name="creditCardType" class="required form-control" id="creditCardType" data-deselect="false" data-error-message="Please select valid card type!">
                                    <option value="">Card Type</option>
                                    <option value="master">Master Card</option>
                                    <option value="visa">Visa</option>
                                    </select>
                                    <span class="caret-down"></span>
                                    </div>-->
                                 <select name="creditCardType" class="required form-control" data-deselect="false" data-error-message="Please select valid card type!" id="creditCardType">
                                    <option value="">Card Type</option>
                                    @php 
                                    foreach($config['allowed_card_types'] as $key=>$value): 
                                    @endphp
                                    <option value="@php echo $key @endphp">@php echo ucfirst($value) @endphp</option>
                                    @php 
                                    endforeach 
                                    @endphp
                                </select>
                              </div>
                              <div class="form-group">
                                 <div class="div100 input-pad" style="position: relative;">
                                    <div class="tt tt-mc">
                                       <div class="top">
                                          <h5>
                                             <img src="{{ $path['images'] }}/mastercard-popup-logo.png">
                                             <br>
                                             <br>
                                             <b style="color: green;">
                                             <i class="fa fa-check-circle"></i> $2 OFF </b> Mastercard Promo Applied! Please enter your mastercard. <br>
                                          </h5>
                                          <i class="i-arrow"></i>
                                       </div>
                                    </div>
                                    <input id="creditCardNumber" name="creditCardNumber" autocomplete="off" class="form-control form-control-lg card-number required" type="tel" placeholder="Card Number" maxlength="16" data-error-message="Please enter a valid credit card number!" oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');" value="" required="">
                                 </div>
                              </div>
                              <div class="form-group">
                                 <div class="div50 input-pad pr-1">
                                    <div id="i0f2n select-field">
                                       <select name="expmonth" class="required expmonth all-fields form-control form-control-lg py-0" data-error-message="Please select a valid expiry month!">
                                           @php get_months(); @endphp
                                       </select>
                                       <span class="caret-down"></span>
                                    </div>
                                 </div>
                                 <div class="div50 input-pad pl-1">
                                    <div id="i4uyh select-field">
                                       <select name="expyear" class="required all-fields form-control form-control-lg py-0" data-error-message="Please select a valid expiry year!">
                                           @php get_years(); @endphp
                                       </select>
                                       <span class="caret-down"></span>
                                    </div>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>
                              <div class="form-group">
                                 <div class="div50 input-pad pr-1">
                                    <input id="cvv" name="CVV" value="" class="form-control form-control-lg card-cvc required" size="3" type="tel" placeholder="CVV" pattern="(\D*\d){3}" title="3 Digit Security Code" data-validate="cvv" data-error-message="Please enter a valid CVV!" onkeyup="javascript: this.value = this.value.replace(/[^0-9]/g,'');" data-max-length="3" data-min-length="3" maxlength="3">
                                 </div>
                                 <div class="div50 input-pad pl-1">
                                    <a href="javascript:void(0);" onclick="javascript:openNewWindow('cvv.php', 'modal');">
                                    <img src="{{ $path['images'] }}/cvv.png" id="if12af">
                                    </a>
                                 </div>
                                 <div class="clearfix"></div>
                              </div>
                              <div class="form-group">
                                 <div id="i8pkb3"></div>
                                 <label class="frm-chk">
                                 <input type="checkbox" checked="checked" class="chkbx" name="bill_checkbox" value="yes" id="chkboxSameAddress">
                                 <span class="cust_check">Billing Address is same as Shipping Address</span>
                                 </label>
                                 <p style="display: none;">
                                    <label>Billing same as Shipping</label>
                                    <input type="radio" name="billingSameAsShipping" value="yes" checked="" id="billingSameAsShippingYes"> YES 
                                    <input type="radio" name="billingSameAsShipping" value="no" id="billingSameAsShippingNo"> NO
                                 </p>
                                 <!-- START Billing address = Shipping address -->
                                 <div id="billAddress" class="bilng billing-info display-none">
                                    <div class="fields">
                                       <input value="" type="text" name="billingFirstName" data-group="2" placeholder="Billing First Name" data-field="billing_first_name" class="form-control  all-fields" data-error-message="Please enter your billing first name!">
                                    </div>
                                    <div class="fields">
                                       <input value="" type="text" name="billingLastName" data-group="2" placeholder="Billing Last Name" data-field="billing_last_name" class="form-control  all-fields" data-error-message="Please enter your billing last name!">
                                    </div>
                                    <div style="display: block;" class="fields">
                                       <select name="billingCountry" class="form-control" data-error-message="Please select your billing Country!" data-selected="US">
                                          <option value="US">United States</option>
                                       </select>
                                    </div>
                                    <div class="fields">
                                       <input type="text" class="form-control all-fields" name="billingZip" placeholder="Billing Zip Code" data-error-message="Please enter a valid billing zip code!">
                                    </div>
                                    <div class="fields">
                                       <input value="" type="text" name="billingAddress1" data-group="2" placeholder="Billing Address" data-field="billing_address" class="form-control  all-fields" data-error-message="Please enter your billing address!">
                                    </div>
                                    <!--<div class="fields">
                                       <input value="" type="text" name="billingAddress2" data-group="2" placeholder="Billing Apt / Suite" data-field="billing_address_2" class="form-control all-fields">
                                       </div>-->
                                    <div class="fields">
                                       <input value="" type="text" name="billingCity" data-group="2" placeholder="Billing City" data-field="billing_city" class="form-control  all-fields" data-error-message="Please enter your billing city!">
                                    </div>
                                    <div class="fields">
                                       <input type="text" class="form-control all-fields" name="billingState" placeholder="Billing State" data-error-message="Please select your billing state!"> 
                                    </div>
                                 </div>
                                 <!-- END Billing address = Shipping address -->
                                 <div class="clearfix"></div>
                                 <button type="submit" id="process_button" class="btn btn-success btn-lg btn-block form-submit-btn">SUBMIT</button>
                                 <center style="padding: 20px 0 0;font-size: 14px;"> We accept the following credit cards: <br>
                                    <img src="{{ $path['images'] }}/visa-master-cards.png" class="footer-cards img-responsive" width="264" height="58">
                                 </center>
                              </div>
                           </div>
                        </form>
                     </div>   
                  </div>
               </div>
            </div>
         </div>
      </section>
      <div class="">
         <footer>
            <div id="footer_trial_disclaimer"></div>
            <div class="footer">
               <p class="copyright"> Copyright © {{ date('Y') }} {{ $copyright_name }} - All Rights Reserved. </p>
               <p class="footerlinks">
                  <a href="javascript:void(0);" onclick="javascript:openNewWindow('page-terms.php', 'modal');">Terms &amp; Conditions</a> &nbsp;| &nbsp; <a href="javascript:void(0);" onclick="javascript:openNewWindow('page-privacy.php', 'modal');">Privacy Policy</a>&nbsp;| &nbsp; <a href="javascript:void(0);" onclick="javascript:openNewWindow('page-contact.php', 'modal');">Contact Us</a>
               </p>
            </div>
         </footer>
         <div id="loading-indicator" style="display:none;">
            <div class="white_box_cs">
               <i>
               <img src="{{ $path['images'] }}/loading.gif">
               </i>
               <span>Processing, one moment please...</span>
            </div>
         </div>

         <!--<div class="disCardDec" id="entry_upsell_pop" style="display: none;">
            <div class="disCardDecBg"></div>
            <div class="disCardDecInfos">
            <a href="javascript:void(0);" class="disCardDecPopClose" id="crossbtn">x</a>
            <div class="disCardDecContents">
                <p>
                    <b> <span>DOUBLE YOUR LUCK: </span>Increase your chances to win for just $9.97. If your name is drawn multiple times you will receive both prizes as well. </b>
                </p>
            </div>
            <div class="btnSection">
                <div class="btnLeft">
                    <button id="accpetbutton" type="submit">Yes, I am feeling lucky!</button>
                </div>
                <div class="btnRight">
                    <button id="notaccpetbutton" type="submit">No, I don't feel like winning</button>
                </div>
            </div>
            </div>
        </div>-->

        <div class="disCardDec i1d8clg_global" id="entry_upsell_pop" style="display: none">
            <div class="disCardDecBg"></div>
            <div id="i4orf5h" class="popup-activate__inner">
            <!--<i id="iytr2om" class="popup-activate__close js__close close-expopup-and-active"></i>-->
            <div id="invtoan" class="popup-activate__content">
                <div id="i16yjbg" class="popup-activate__header">
                    <h2 id="ix04u3b" class="popup-activate__title">WAIT!</h2>
                </div>
                <div id="itdnko9" class="popup-activate__body">
                    <!-- <h3 id="i8wp12u" class="popup-activate__promo-text">Save An Extra {price} OFF On Top Of The <span id="iwbx0hh"><span id="ijy5ivv"><span id="irpms3k" class="hb-value">50%</span> Discount</span> With This Free Coupon!</span></h3> -->         
                <p class="lucktxt"> <b> <span>DOUBLE YOUR LUCK: </span>Increase your chances to win for just $11.95. If your name is drawn multiple times you will receive both prizes as well.</b></p>

                <div id="timeCount" style="display: flex; align-item: center; justify-content:center;">
                        <div class="w_item">
                            <div class="ex-minute" style="font-size: 2rem; font-weight: bold;"><span>0</span><span>2</span></div>
                            <div class="minute-text" style="font-size: 0.8rem; margin-top: 2px;font-weight: 500;">minutes</div>
                        </div>
                        <div class="w_item">
                            <div class="semicolon" style="font-size: 2rem; font-weight: bold;">:</div>
                        </div>
                        <div class="w_item">
                            <div class="ex-second" style="font-size: 2rem; font-weight: bold;"><span>0</span><span>0</span></div>
                            <div class="second-text" style="font-size: 0.8rem; margin-top: 2px;font-weight: 500;">seconds</div>
                        </div>
                    </div>
                </div>
                <div id="im8tj6e" class="popup-activate__footer"><button type="button" id="accpetbutton" class="popup-activate__btn-yes js__btn-yes">YES, I AM FEELING LUCKY!</button></div>
                <p><a href="javascript:void(0);" class="mc-no-thanks master-card-action notlcky" id="notaccpetbutton">No, I don't feel like winning</a></p>
            </div>
            </div>
        </div>



         <!-- mc popup -->
         <!--  <div class="mcDiscCardDec mc-modal" id="mc_pop" style="display:block">  -->
         <div class="mcDiscCardDec mc-modal" id="mc_pop" style="display:none">
            <div class="mcDiscCardDecBg"></div>
            <div class="mcDiscCardDecInfos">
               <div class="mcDiscCardDecContents">
                  <div class="card-body-content">
                     <h3 style="letter-spacing: 0px;color: green;border-bottom: 1px solid #ccc;">LIMITED TIME MASTERCARD DISCOUNT</h3>
                     <div class="mc-body text-center">
                        <p>MASTERCARD Users <br>will receive an additional <span class="text2" style="color: green;font-weight: 700;">$2 OFF</span> when paying with </p>
                        <img src="{{ $path['images'] }}/mc1.png" width="360" height="65">
                        <button id="mastercard-select" type="button" class="mastercard-select btn btn-success btn-lg btn-block pulse master-card-action yes">
                        <img src="{{ $path['images'] }}/tick.png" alt="" style="width: 24px;display: inline-block;"> Yes, I want to receive <b>$2 OFF</b> with my  MasterCard
                        </button>
                        <p><a href="javascript:void(0);" class="mc-no-thanks master-card-action" id="notomaster">No Thanks, I don't want to save extra money!</a>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

        @php
        include 'app/general/__scripts__.tpl';
        include 'app/general/__analytics__.tpl';
        perform_body_tag_close_actions();
        @endphp

        <script src="{{ $path['js'] }}/promise.min.js" type="text/javascript"></script>
        <script src="{{ $path['js'] }}/jquery.mask.min.js" type="text/javascript"></script>   
        <script>

            var cb_campaign_id_visa = "<?php echo $cb_campaign_id_visa; ?>";
            var cb_campaign_id_mc = "<?php echo $cb_campaign_id_mc; ?>";

            var product_price_visa = "<?php echo $product_price_visa; ?>";
            var product_price_mc = "<?php echo $product_price_mc; ?>";

            var badge_product_price_visa = "<?php echo $badge_product_price_visa; ?>";
            var badge_product_price_mc = "<?php echo $badge_product_price_mc; ?>";

            var cb_dp_campaign_id_visa = <?php echo $cb_dp_campaign_id_visa ?>;
            var cb_dp_campaign_id_mc = <?php echo $cb_dp_campaign_id_mc ?>;

            var dpDeclinesArray = <?php echo json_encode($g_settings['dp_declines']); ?>;

            $("#chkboxSameAddress").click(function(){  
                $("#billAddress").toggleClass("display-block");
                $("#billingDiv").slideToggle("slow");
                if($('#chkboxSameAddress').is(':checked')) {
                    $('#billingSameAsShippingYes').click();
                }else{
                    $('#billingSameAsShippingNo').click();
                }
            });

            $("#creditCardNumber").on('keyup',function(e){
                var creditCardType = $("[name='creditCardType']").val();

                if (/^\d$/.test(e.key) || e.key === 'Backspace') {

                if($("#creditCardNumber").val().length>0){
                    $("[name='creditCardType']").attr('style','cursor: not-allowed;pointer-events: none;');
                }else{
                    $("[name='creditCardType']").removeAttr('style');
                }

                // console.log(creditCardType);
               
                if(creditCardType === 'visa'){
                    // $("#creditCardType").addClass('no_trigger');
                    // $("#creditCardType").removeClass('yes_trigger');
                    if($(this).val().length ==4){
                        // $(".mc-modal").css('display','block');
                        // $("#creditCardNumber").attr('readonly',true);
                    }
                    $("#campaign_id").val(cb_campaign_id_visa);
                    $(".productimg").html(`<img src="${badge_product_price_visa}" class="card-image" alt="Master Card">`);
                    $("#main_price").text('$'+product_price_visa);
                }else if(creditCardType === 'master'){
                    $("#campaign_id").val(cb_campaign_id_mc);
                    $(".productimg").html(`<img src="${badge_product_price_mc}"  class="card-image" alt="Master Card">`);
                    $("#main_price").text('$'+product_price_mc);
                }
                // else {
                //     if($(this).val().length <=3){
                //         $(".mc-modal").css('display','block');
                //         $("#creditCardNumber").attr('readonly',true);
                //     }
                // }
                }
            })
            $(".mc-no-thanks").on("click", function(){   
                // $(".mc-modal").css('display','none');
                // $("#creditCardNumber").attr('readonly',false).focus();
            })
            
            $(".mastercard-select").on("click",function(){
                // $(".mc-modal").css('display','none');
                // $("#creditCardNumber").attr('readonly',false);
                $("#creditCardType").val('master').trigger('change');
                $("#creditCardNumber").val('').focus();

                if($("#creditCardNumber").val().length>0){
                    $("[name='creditCardType']").attr('style','cursor: not-allowed;pointer-events: none;');
                }else{
                    $("[name='creditCardType']").removeAttr('style');
                }
                
            })
            $("#creditCardType").on('change',function(){
                if($("#creditCardNumber").val().length>0){
                    $("[name='creditCardType']").attr('style','cursor: not-allowed;pointer-events: none;');
                }else{
                    $("[name='creditCardType']").removeAttr('style');
                }
                console.log($(this).val());
                if($(this).val()=='visa'){
                    // $(".mc-modal").css('display','block');
                    // $("#creditCardNumber").attr('readonly',true);
                    $("#campaign_id").val(cb_campaign_id_visa);
                    $(".productimg").html(`<img src="${badge_product_price_visa}" id="mc_img" class="card-image" alt="Master Card">`);
                    $("#main_price").text('$'+product_price_visa);
                }else if($(this).val()=='master'){
                    $("#campaign_id").val(cb_campaign_id_mc);
                    $(".productimg").html(`<img src="${badge_product_price_mc}" id="mc_img" class="card-image" alt="Master Card">`);
                    $("#main_price").text('$'+product_price_mc);
                }
            })


            $("#creditCardType").on('click',function(){
                if ($(this).val() == 'visa') {
                    $("#creditCardType").addClass('no_trigger');
                    $("#creditCardType").removeClass('yes_trigger');
                }else{
                    $("#creditCardType").addClass('yes_trigger');
                    $("#creditCardType").removeClass('no_trigger');
                }
            });
            $("body").on('change','.yes_trigger', function() {
                if ($(this).val() == 'visa') {
                    $(".mc-modal").css('display','block');
                    $("#creditCardNumber").attr('readonly',true);
                }
            });

            $("#crossbtn").click(function(){
                $("#notaccpetbutton").click();
            });

            $("#notaccpetbutton").click(function(){
                call_main_product();
            });

           function call_main_product(attempt=1){
                $.ajax({
                    url: AJAX_PATH + 'checkout',
                    method: 'post',
                    data:$('[name=checkout_form]').serialize(),
                    beforeSend: function() {
                        $('#loading-indicator').show();
                    }
                }).done(function(data) {
                    if (data.success) {
                        call_ebook_upsell();
                    } else {
                        store_order_details(data.declineOrderId, function(res){
                            console.log(res)
                            if(res.success){
                                // console.log(data);
                                $('#loading-indicator').hide();
                                cb.errorHandler(data.errors);
                            }
                        }) 
                    }
                }).fail(function() {
                    $('#loading-indicator').hide();
                    console.error('Checkout request failed.');
                });
            }

            function call_ebook_upsell(){
                $.ajax({
                    url: app_config.offer_path + 'upsell1.php',
                    method: 'post',
                    data: {}
                }).success(function(data) {
                    $.ajax({
                        url: AJAX_PATH + 'upsell', 
                        method: 'post',
                        data: $('[name=is-upsell]').serialize()
                    }).success(function(data) {
                        if (data.success) {
                            console.log(data);
                            window.location.href = data.redirect;
                        } else {
                            cb.errorHandler(data.errors);
                        }
                    }).error(function(e){
                        cb.errorHandler(e);
                    });
                }).error(function(e){
                    cb.errorHandler(e);
                });
            }

            function call_order_view(order_id,callback){
                $.ajax({
                    url:'ajax_order_view.php',
                    type:'POST',
                    data:{order_id:order_id},
                    dataType: 'json',
                    success: function(response) {
                        callback(response);
                    }
                })
            }

            function store_order_details(order_id='',callback){
                $.ajax({
                    url:'store_order_details.php',
                    type:'POST',
                    data:{order_id:order_id},
                    dataType: 'json',
                    success: function(response) {
                        callback(response)
                        //console.log(response);
                    }
                })
            }

            $(document).ready(function() {
                $("#process_button").on('click',function(){
                    cb.beforeFormSubmitEvents.push(function(e) {
                        $('#loading-indicator').show();
                        store_order_details('',function(res){
                            console.log(res);
                            if(res.count<res.limit){
                                if(res.prevOrderId!=null ){
                                    call_order_view(res.prevOrderId, function(response){
                                        if (response.success) {
                                            $("#gateway_id").val(response.order.gatewayId);
                                            call_main_product();
                                        } else {
                                            call_main_product();
                                            console.log("Order Not Found:", response.message);
                                        }
                                    });
                                }else{
                                    call_main_product();
                                }
                            }else{
                                cb.errorHandler([res.message]);
                                $('#loading-indicator').hide();
                            }
                            //console.log(res);
                        });
                        // $("#entry_upsell_pop").css("display","block");
                        // const timerInterval = setInterval(updateTimer, 1000);
                        // // Initialize the timer display
                        // updateTimer();
                    });
                });
            });

            // Select the elements where minutes and seconds are displayed
            const minuteSpans = document.querySelectorAll('.ex-minute span');
            const secondSpans = document.querySelectorAll('.ex-second span');

            // Set the initial countdown time to 5 minutes (300 seconds)
            let timeLeft = 120;

            // Function to format the time and update the DOM elements
            function updateTimer() {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;

                // Update the minutes and seconds in the DOM
                minuteSpans[0].textContent = Math.floor(minutes / 10);
                minuteSpans[1].textContent = minutes % 10;
                secondSpans[0].textContent = Math.floor(seconds / 10);
                secondSpans[1].textContent = seconds % 10;

                // Decrement the time left
                if (timeLeft > 0) {
                    timeLeft--;
                } else {
                    clearInterval(timerInterval);
                }
            }

            
        </script>
      </div>
   </body>
</html>
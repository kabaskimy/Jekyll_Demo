/**
* Pattaya.Checkout
*
* Required: jquery/jquery-1.7.js
*
* Return: {
*           init: function
*         }
*/
(function (window, Pattaya, $, undefined) {
    var HTML_LOADING = '<span class="icon_loader"></span>';
    var forbiddenPayMenthod = false;

    var _ns = Pattaya.Global.ns("Checkout", Pattaya),
        _lang = Pattaya.Global.ns("Checkout.Lang", Pattaya);

    var _config = {
        "paypalUnvalidChars1": ['<', '>', '(', ')', '{', '}', '[', ']', '?', ';', '&', '*', '~', '`', '!', '@', '$', '%', '^', '_', '=', '+', '|', '\\', ':', '\"', '/'],
        "paypalUnvalidChars2": ['<', '>', '(', ')', '{', '}', '[', ']', '?', ';', '&', '*', '~', '`', '!', '@', '#', '$', '%', '^', '=', '+', '|', '\\', ':', '\'', '\"', '.', '/', ','],
        "paypalUnvalidChars3": ['<', '>', '(', ')', '{', '}', '[', ']', '?', ';', '&', '*', '~', '`', '!', '@', '#', '$', '%', '^', '_', '=', '+', '|', '\\', ':', '\"', ',', '/'],
        "paypalUnvalidChars4": ['<', '>', '(', ')', '{', '}', '[', ']', '?', ';', '&', '*', '~', '`', '!', '@', '#', '$', '%', '^', '=', '|', '\\', ':', '\'', '\"', '.', '/', ','],
        "creditCardUnvalidChars1": ['<', '>', '(', ')', '{', '}', '[', ']', '?', '&', '*', '~', '`', '!', '@', '#', '$', '%', '^', '=', '+', '|', '\\', ':', '\'', '\"', '.', '/', ';', ',', '_'],
        "creditCardUnvalidChars2": ['<', '>', '(', ')', '{', '}', '[', ']', '?', '&', '*', '~', '`', '!', '@', '#', '$', '%', '^', '_', '=', '+', '|', '\\', ':', '\"', ',', '/', ';'],
        "creditCardUnvalidChars3": ['<', '>', '(', ')', '{', '}', '[', ']', '?', '&', '*', '~', '`', '!', '@', '$', '%', '^', '_', '=', '+', '|', '\\', ':', '\"', '/', ';']
    };

    var commonRules = {
        "#panel-email": {
            "required": true,
            "email": true
        },
        "#panel-firstname": {
            "required": true,
            "maxlength": 25
        },
        "#panel-lastname": {
            "required": true,
            "maxlength": 20
        },
        "#panel-street1": {
            "required": true,
            "maxlength": 100
        },
        "#panel-street2": {
            "maxlength": 90
        },
        "#panel-city": {
            "required": true,
            "maxlength": 40
        },
        "#panel-state": {
            "required": true,
            "maxlength": 40
        },
        "#panel-postalcode": {
            "required": true,
            "maxlength": 20
        },
        "#panel-phonenumber": {
            "required": true,
            "maxlength": 20
        }
    },
	creditCardRules = {
	    "#panel-email": {
	        "required": true,
	        "email": true
	    },
	    "#panel-firstname": {
	        "required": true,
	        "maxlength": 25,
	        "unvalidChars": _config.creditCardUnvalidChars2
	    },
	    "#panel-lastname": {
	        "required": true,
	        "maxlength": 20,
	        "unvalidChars": _config.creditCardUnvalidChars2
	    },
	    "#panel-street1": {
	        "required": true,
	        "maxlength": 100,
	        "unvalidChars": _config.creditCardUnvalidChars3
	    },
	    "#panel-street2": {
	        "maxlength": 90,
	        "unvalidChars": _config.creditCardUnvalidChars3
	    },
	    "#panel-city": {
	        "required": true,
	        "maxlength": 40,
	        "unvalidChars": _config.creditCardUnvalidChars1
	    },
	    "#panel-state": {
	        "required": true,
	        "maxlength": 40,
	        "unvalidChars": _config.creditCardUnvalidChars1
	    },
	    "#panel-postalcode": {
	        "required": true,
	        "maxlength": 20,
	        "unvalidChars": _config.creditCardUnvalidChars1
	    },
	    "#panel-phonenumber": {
	        "required": true,
	        "maxlength": 20,
	        "unvalidChars": _config.creditCardUnvalidChars1
	    }
	},
	paypalRules = {
	    "#panel-email": {
	        "required": true,
	        "email": true
	    },
	    "#panel-firstname": {
	        "required": true,
	        "maxlength": 25,
	        "unvalidChars": _config.paypalUnvalidChars3
	    },
	    "#panel-lastname": {
	        "required": true,
	        "maxlength": 20,
	        "unvalidChars": _config.paypalUnvalidChars3
	    },
	    "#panel-street1": {
	        "required": true,
	        "maxlength": 100,
	        "unvalidChars": _config.paypalUnvalidChars1
	    },
	    "#panel-street2": {
	        "maxlength": 90,
	        "unvalidChars": _config.paypalUnvalidChars1
	    },
	    "#panel-city": {
	        "required": true,
	        "maxlength": 40,
	        "unvalidChars": _config.paypalUnvalidChars1
	    },
	    "#panel-state": {
	        "required": true,
	        "maxlength": 40,
	        "unvalidChars": _config.paypalUnvalidChars1
	    },
	    "#panel-postalcode": {
	        "required": true,
	        "maxlength": 20,
	        "unvalidChars": _config.paypalUnvalidChars2
	    },
	    "#panel-phonenumber": {
	        "required": true,
	        "maxlength": 20,
	        "unvalidChars": _config.paypalUnvalidChars4
	    }
	};

    var initMoney = function () {
        var radix1 = $.trim($("#dx-radix").data("val")),
        thousand = $.trim($("#thousand").val()),
        //currencySymbol = $.trim($("#currencySymbol").val()),
        currencyCode = $.trim($("#currencyCode").val());

        return {
            format: function (m, cc, f) {
                var radixTemp = radix1;

                if (cc === undefined) {
                    cc = currencyCode;
                }

                if (f === undefined) {
                    f = "%s %v";
                }

                return accounting.formatMoney(m, cc, 2, thousand, radixTemp, f);
            },
            unformat: function (m) {
                var radixTemp = radix1;
                return accounting.unformat(m, radixTemp);
            }
        }
    };

    var initOverlay = function () {
        var $el;

        var create = function () {
            $el = $("#checkoutModal");

            if ($el.length > 0) {
                return $el;
            }

            $el = $('<div id="checkoutModal"></div>').addClass('checkout_modal')
			              .appendTo(document.body)
			              .css({
			                  width: getWidth(),
			                  height: getHeight()
			              });

            $(window).resize(function () {
                $el.css({
                    width: 0,
                    height: 0
                });
                setTimeout(function () {
                    $el.css({
                        width: Pattaya.Checkout.overlay.getWidth(),
                        height: Pattaya.Checkout.overlay.getHeight()
                    });
                }, 1);
            });

            return $el;
        },
        getWidth = function () {
            var scrollWidth,
			    offsetWidth;
            // handle IE
            if ($.browser.msie) {
                scrollWidth = Math.max(
				        document.documentElement.scrollWidth,
				        document.body.scrollWidth
			        );
                offsetWidth = Math.max(
				        document.documentElement.offsetWidth,
				        document.body.offsetWidth
			        );

                if (scrollWidth < offsetWidth) {
                    return $(window).width() + 'px';
                } else {
                    return scrollWidth + 'px';
                }
                // handle "good" browsers
            } else {
                return $(document).width() + 'px';
            }
        },
        getHeight = function () {
            var scrollHeight,
			    offsetHeight;
            // handle IE 6
            if ($.browser.msie) {
                scrollHeight = Math.max(
				        document.documentElement.scrollHeight,
				        document.body.scrollHeight
			        );
                offsetHeight = Math.max(
				        document.documentElement.offsetHeight,
				        document.body.offsetHeight
			        );

                if (scrollHeight < offsetHeight) {
                    return $(window).height() + 'px';
                } else {
                    return scrollHeight + 'px';
                }
                // handle "good" browsers
            } else {
                return $(document).height() + 'px';
            }
        };

        return {
            show: function () {
                create().show();
            },
            hide: function () {
                create().hide();
            },
            getWidth: getWidth,
            getHeight: getHeight
        }
    };
    $.extend(_ns, { overlay: initOverlay() });

    var validate = function (selector, settings) {
        //var format = Pattaya.Global.Utils.format;

        var format = function (str) {
            if (typeof str !== "string") {
                return str;
            }
            var l = arguments.length,
                i = 0,
                reg;

            for (; i < l - 1; i++) {
                reg = new RegExp('\\{' + i + '\\}', 'g');
                var v = arguments[i + 1];
                str = str.replace(reg, function () { return v; });
            }

            return str;
        };

        var render = function (ele, msg, type) {
        },
		renderError = function (ele, msg) {
		    render(ele, msg, "error");
		},
		renderSuccess = function (ele) {
		    render(ele, '', "success");
		},
		clear = function (ele, type) {
		    var parent = ele.parent(),
                infobox = parent.find(".infobox");

		    if (type == "error") {
		        if (parent.hasClass("v_error")) {
		            parent.removeClass("v_error");
		            infobox.hide();
		        }
		    } else if (type == "success") {
		        if (parent.hasClass("v_success")) {
		            parent.removeClass("v_success");
		            infobox.hide();
		        }
		    }
		},
		clearError = function (ele) {
		    clear(ele, "error");
		};

        var validMessages = {
            required: _lang.FiledRequired,
            email: _lang.EmailUnvalid,
            maxlength: _lang.MaxLength,
            maxBytesLength: _lang.MaxBytesLength,
            equalTo: _lang.EqualTo,
            wordnum: _lang.WordNum,
            unvalidChars: _lang.UnvalidChars
        },

		validMethods = {
		    required: function (val) {

		        if (val.length > 0) {

		            return true;
		        }

		        return false;
		    },
		    email: function (val) {

		        if (Pattaya.Global.Validation.email(val)) {

		            return true;
		        }

		        return false;

		    },
		    maxlength: function (val, max) {

		        if (val.length <= max) {

		            return true;
		        }

		        return false;
		    },
		    maxBytesLength: function (val, maxBytes) {
		        var m = encodeURIComponent(val).match(/%[89ABab]/g),
		            bytes = val.length + (m ? m.length : 0);

		        if (bytes <= maxBytes) {
		            return true;
		        }

		        return false;
		    },
		    equalTo: function (val, selector) {

		        return val == $(selector).val();
		    },
		    wordnum: function (val) {
		        return /^[a-z0-9]*$/i.test(val);
		    },
		    remote: function (val, opts, calls) {
		        $.ajax({
		            url: opts.url,
		            dataType: 'json',
		            data: { 'val': val }
		        }).done(function (data) {
		            if (data) {
		                if (data.state === "1") {
		                    calls.success();
		                } else if (data.state === "0" || data.state === "-1") {
		                    calls.error(data.msg);
		                }
		            }
		        });
		    },
		    unvalidChars: function (val, arr) {
		        var result = {
		            valid: true
		        },
				arrP = [];

		        $.each(arr, function (i, c) {
		            if (val.indexOf(c) > -1) {
		                result.valid = false;

		                arrP.push("'" + c + "'");
		            }
		        });

		        result.param = arrP.join(', ');

		        return result;
		    }
		},

		validator = function (submitCallbacked) {
		    var ele = $(this),
				val = $.trim(ele.val()),
				msg,
				result = true;

		    var field,
				rule,
				hasRemote;

		    if (ele.data("valid") === false) {
		        return true;
		    }

		    for (filed in validMethods) {

		        rule = ele.data(filed);

		        if (rule) {
		            if (filed == "remote") {
		                hasRemote = true;

		                continue;
		            }

		            r = validMethods[filed](val, rule);

		            if (r === false || r && r.valid === false) {

		                if (r && r.param !== undefined) {
		                    msg = format(validMessages[filed], ele.data("field"), rule, r.param);
		                } else {
		                    msg = format(validMessages[filed], ele.data("field"), rule);
		                }

		                renderError(ele, msg);

		                return false;
		            }
		        }
		    }

		    if (hasRemote) {
		        if (submitCallbacked) {
		            return !(ele.data("remote-result") === false);
		        } else {
		            clearError(ele);

		            validMethods["remote"](val, ele.data(filed), {
		                error: function (msg) {
		                    ele.data("remote-result", false);
		                    renderError(ele, msg);
		                },
		                success: function () {
		                    ele.data("remote-result", true);
		                    renderSuccess(ele);
		                }
		            });

		            return "pending";
		        }
		    }

		    renderSuccess(ele);

		    return result;
		},

		addValidRules = function (opt) {

		    var ele,
				selector,
				rules;

		    for (selector in opt) {

		        ele = $(selector);
		        rules = opt[selector];

		        var rule;

		        for (rule in validMethods) {
		            ele.data(rule, false);
		        }

		        for (rule in rules) {
		            ele.data(rule, rules[rule]);
		        }
		    }
		};


        function init() {
            if (settings.render) {
                render = settings.render;
            }

            addValidRules(settings.rules);

            $(":text, :password", $(selector)).data("validator", validator).on("blur", function () {

                var ele = $(this);

                if (!ele.data("blured")) {

                    ele.data("blured", true).on("keyup", validator);
                }

                ele.data("validator").call(this);
            });
        }

        init();
    };
    $.extend(_ns, { validate: validate });

    var bindAddressValidation = function (rules) {
        Pattaya.Checkout.validate("#shipping-address-panel", {
            rules: rules,
            render: function (ele, msg, type) {
                var field = ele.data("field"),
				parent = ele.parent();

                var infobox = parent.find(".infobox"),
				vField = infobox.data("field");

                if (infobox.length == 0 && type == "error") {
                    parent.append('<span class="infobox" data-field="' + field + '"><i class="icon_error"></i><span class="info">' + msg + '</span></span>');
                } else {
                    if (type == "success" && field == vField) {
                        infobox.hide();
                    } else if (type == "error") {
                        infobox.data("field", field)
							.find(".info").text(msg)
						.end().show();
                    }
                }
            }
        });
    };

    var shipping = function (settings) {

        var _settings = $.extend(true, {
            "editAddressUrl": "",
            "getShippingChargesUrl": "",
            "getAddressListUrl": "",
            "setDefaultAddressUrl": "",
            "deleteAddressUrl": "",
            "AddressCount": 5
        }, settings);

        var isAnoUser = function () {
            return $("#btnLogin").data("guest-logined");
        },
        isLoginedUser = function () {
            if ($("#user").length > 0) {
                return true;
            }

            return false;
        };

        //shipping address
        var sc = $("#shipping-address-container"),
            scTitle = $("#shipping-address-title"),
            scPanel = $("#shipping-address-panel"),
            userEmail = $("#Email"),
            address = {
                "City": "",
                "CountryCode": "",
                "CountryName": "",
                "FirstName": "",
                "LastName": "",
                "PhoneNumber": "",
                "PostalCode": "",
                "State": "",
                "Street1": "",
                "Street2": ""
            },
            overlay = initOverlay();


        var 
        showShippingAddressError = function (msg) {
            $("#shippingAddressError").show().find(".error").html(msg);
        },
        hideShippingAddressError = function () {
            $("#shippingAddressError").hide();
        },
        showAddressOverlay = function () {
            initOverlay().show();

            $(".address_options", sc).css({
                "position": "relative",
                "z-index": 100
            });
        },
        hideAddressOverlay = function () {
            overlay.hide();

            $(".address_options", sc).css({
                "position": "static",
                "z-index": "auto"
            });
        },
        showEditAddress = function () {
            scTitle.removeClass("disabled").hide();
            $("#cancelAddress").show();
            $("#cancelBackToCart").hide();

            scPanel.show();
            showAddressOverlay();
        },
        hideEditAddress = function () {

            scTitle.addClass("none on")
                .find("i").addClass("up");

            if ($("tr[data-aid!='0'][data-aid!='']", sc).length >= 5) {
                scTitle.hide()
            } else {
                scTitle.show();
            }

            scPanel.hide();
            hideAddressOverlay();
            $("#shipping-address-error").hide();
            $(".infobox", scPanel).hide();
        },
        setAddress = function (address) {
            $.each(address, function (prop) {
                $("#" + prop).val(address[prop]);
            });
        },
        getCurAddress = function () {
            var curAddress = {};
            $.each(address, function (prop) {
                curAddress[prop] = $("#" + prop).val();
            });

            return curAddress;
        },
        editAddress = function (newAddress) {
            var addressPanel = $("tr[data-aid='" + newAddress.ID + "']", sc);

            $.each(address, function (prop) {
                if (prop == "CountryName") {
                    $("." + prop, addressPanel).data("countrycode", newAddress.CountryCode).text(newAddress.CountryName);
                } else {
                    $("." + prop, addressPanel).text(newAddress[prop]);
                }
            });

            var curAddress = getCurAddress();

            if (curAddress.Street1 !== newAddress.Street1 ||
                curAddress.Street2 !== newAddress.Street2 ||
                curAddress.City !== newAddress.City ||
                curAddress.State !== newAddress.State ||
                curAddress.CountryCode !== newAddress.CountryCode ||
                curAddress.PostalCode !== newAddress.PostalCode) {

                $("input:radio", addressPanel).data("checked", false);
                $("input:radio", addressPanel).prop("checked", false);

                $("td.name", addressPanel).click();
            } else {
                setAddress(newAddress);
            }

        },
        addAddress = function (newAddress, selectedAddress) {
            var html = Pattaya.Global.UI.tmpl("#checkout_sa_tmpl", { addresses: newAddress }),
                firstAddress = $('tr.firstAddress', sc);

            if (firstAddress.length == 0) {


                if (selectedAddress && selectedAddress.ID && selectedAddress.ID > 0) {

                    var tAddr = $("[data-aid=" + selectedAddress.ID + "]", sc);

                    if (tAddr.length > 0) {
                        tAddr.remove();
                    }
                }

                $("tbody", sc).prepend(html);
            } else {
                var aid = firstAddress.data("aid");

                if (aid && aid != 0) {

                    var isIn = false;

                    $.each(newAddress, function (i, v) {
                        if (v.ID == aid) {
                            isIn = true;
                        }
                    });

                    if (isIn) {
                        $("tbody", sc).html(html);
                        $("tr[data-aid='" + aid + "']", sc).addClass("selected")
                            .find("input:radio").prop("checked", true);

                        return;
                    }
                }

                if (selectedAddress && selectedAddress.ID && selectedAddress.ID > 0) {

                    var tAddr = $("[data-aid=" + selectedAddress.ID + "]", sc);

                    if (tAddr.length > 0) {
                        tAddr.remove();
                    }
                }

                firstAddress.after(html);
            }

            if (selectedAddress && selectedAddress.ID !== undefined) {
                $("tr[data-aid='" + selectedAddress.ID + "'] td.name").click();
            }
        },

		validateAddress = function () {
		    result = true;

		    $(":text, :password", scPanel).each(function () {

		        var input = $(this),
					validator = input.data("validator");

		        if ($.isFunction(validator)) {
		            if (!validator.call(input[0], true)) {

		                result = false;
		            }
		        }
		    });

		    if (!$(".dropDownCountry .current").data("countrycode")) {
		        var info = $(".dropDownCountry").next(".infobox");

		        if (info.length > 0) {
		            info.show();
		        } else {
		            $(".dropDownCountry").after('<span class="infobox"><i class="icon_error"></i><span class="info">Please select country</span></span>')
		        }

		        result = false;
		    } else {
		        $(".dropDownCountry").next(".infobox").hide();
		    }

		    return result;
		};

        sc.on("click", ".edit", function () {
            var addressPanel = $(this).closest("tr");

            scPanel.data("aid", addressPanel.data("aid"));

            $.each(address, function (prop) {
                if (prop == "CountryCode") {
                    return;
                }

                var ap = $("." + prop, addressPanel);

                if (prop == "CountryName") {
                    var cn = $.trim(ap.text()),
                        cd = ap.data("countrycode");

                    $(".dropDownCountry .current", scPanel).data("countrycode", cd).html(cn + ' <i></i>');
                } else {
                    $("." + prop, scPanel).val($.trim(ap.text()));
                }
            });

            //showing set as default?
            if ($(".default", addressPanel).length > 0 && !$(".default", addressPanel).hasClass("static")) {
                scPanel
                    .find(".setDefault").show()
                        .find("#cbDefault").prop("checked", false);
            } else {
                scPanel.find(".setDefault").hide();
            }

            //set text of button
            var btnSave = $("#saveAddress");
            if ($(".delete", addressPanel).length > 0) {
                btnSave.text(_lang.Save);
            } else {
                btnSave.text(_lang.Confirm);
            }

            showEditAddress();

            return false;
        });

        sc.on("click", ".delete", function () {
            var that = $(this),
                addressPanel;

            if (that.data("loading")) {
                return false;
            } else {
                that.data("loading", true);
            }

            that.next(".icon_error").remove().end().after(HTML_LOADING).data("loading", true);

            addressPanel = that.closest("tr");

            var addressId = addressPanel.data("aid");

            $.ajax({
                url: _settings.deleteAddressUrl,
                data: { addressId: addressId },
                success: function (data) {
                    if (data.success) {
                        addressPanel.fadeOut(function () {
                            var selected = that.closest("tr").find("input:radio").prop("checked");

                            $(this).remove();

                            if (selected) {
                                var ap = $("tr:first", sc);

                                if (ap.length > 0) {
                                    $("td.name", ap).click();
                                } else {
                                    scTitle.click().addClass("disabled");
                                    $("#cancelAddress").hide();
                                }
                            }

                            scTitle.show().removeClass("disabled");
                        });
                    } else {
                        that.data("loading", false).next(".icon_loader").remove().end().after('<i class="icon_error"></i>');

                        setTimeout(function () {
                            that.next(".icon_error").fadeOut();
                        }, 3000);
                    }
                }
            });

            return false;
        });

        sc.on("click", ".default", function () {
            var that = $(this);

            if (that.hasClass("static") || that.data("loading")) {
                return false;
            }

            var addressPanel = $(this).closest("tr"),
                addressId = addressPanel.data("aid");

            that.next(".icon_error").remove().end().after(HTML_LOADING).data("loading", true);

            $.ajax({
                url: _settings.setDefaultAddressUrl,
                data: { addressId: addressId }
            }).done(function (data) {
                if (data.success) {
                    $(".static", sc).removeClass("static");
                    that.addClass("static").data("loading", false)
                    .next(".icon_loader").remove();
                } else {
                    that.data("loading", false).next(".icon_loader").remove().end().after('<i class="icon_error"></i>');

                    setTimeout(function () {
                        that.next(".icon_error").fadeOut();
                    }, 3000);
                }
            });

            return false;
        });

        var addressChangedXHR,
            changeAddressHandle = function () {

                var that = $(this),
                addressPanel = that.parent(),
                aid = addressPanel.data("aid"),
                prevAddress = $("input:radio:checked", sc),
                newAddress = {},
                loading,
                btnPlaceOrder = $("#placeOrder"),
                ccData = btnPlaceOrder.data("computingcharges");

                if ($("input:radio", that).data("checked")) {
                    return false;
                }

                if (ccData) {
                    if (ccData.trigger == "addresschanged") {
                        if (ccData.aid == aid) {

                            return false;
                        } else {
                            if (addressChangedXHR) {
                                addressChangedXHR.reject("aborted");
                            }
                        }
                    } else {
                        return false;
                    }
                }

                addressPanel.addClass("selected")
                .siblings().removeClass("selected");

                $("input:radio", sc).data("checked", false);
                $("input:radio", that).attr("checked", "checked").data("checked", true);

                $.each(address, function (prop) {
                    if (prop == "CountryCode") {
                        return;
                    }

                    var ap = $("." + prop, addressPanel);

                    if (prop == "CountryName") {
                        newAddress["CountryCode"] = ap.data("countrycode");
                    } else {
                        newAddress[prop] = $.trim(ap.text());
                    }
                });

                var error = function () {
                    prevAddress.attr("checked", "checked");
                    showShippingAddressError(_lang.ErrorGetShippingCharges);
                    btnPlaceOrder.data("computedcharges", false);
                },
                success = function () {
                    setAddress(newAddress);

                    btnPlaceOrder.removeData("computingcharges");
                    btnPlaceOrder.removeData("computedcharges");

                    hideShippingAddressError();

                    //					if(!forbiddenPayMenthod) {
                    //						if (newAddress.CountryCode.toLowerCase() == "ru") {
                    //							$("#payment-method-container tr.webmoneyPanel").click();
                    //						} else {
                    //							$("#payment-method-container tr.egp").click();
                    //						}
                    //					}
                };

                //show loading
                loading = $(HTML_LOADING);
                that.append(loading);

                btnPlaceOrder.data("computingcharges", {
                    "trigger": "addresschanged",
                    "aid": aid
                });

                //get shipping charges
                addressChangedXHR = getShippingCharges(newAddress).done(function (data) {
                    if (data.success) {
                        success();
                    } else {
                        error();
                    }
                }).fail(function (data) {
                    if (data !== "aborted") {
                        error();
                    }
                }).always(function () {
                    loading.remove();
                    btnPlaceOrder.removeData("computingcharges");
                });
            };

        sc.on("click", "td.name", changeAddressHandle);

        sc.on("click", "input:radio", function (e) {
            e.stopPropagation();

            changeAddressHandle.call($(this).closest("td")[0], e);
        });

        $("#saveAddress").click(function () {

            var btn = $(this),
                result = validateAddress();

            if (!result) {
                return false;
            }

            var aid = scPanel.data("aid"),
                curAid = $("input:radio:checked", sc).closest("tr").data("aid");

            var param = {};

            $.each(address, function (prop) {
                var sp = $("." + prop, scPanel);

                param[prop] = $.trim(sp.val());
            });

            param.CountryCode = $(".dropDownCountry .current").data("countrycode");
            param.CountryName = $(".dropDownCountry .current").text();

            if (isLoginedUser()) { //edit user address
                if (aid == 0) {
                    param.ID = 0;
                    editAddress(param);
                    hideEditAddress();

                    return false;
                }

                if (btn.data("disable") == "disable") {
                    return false;
                } else {
                    btn.data("disable", "disable").addClass("disabled")
                    .next().addClass("disabled");
                }

                if (aid > 0) {
                    param.ID = aid;
                }

                //set as default address?
                param.defaultAddress = $("#cbDefault", scPanel).prop("checked");

                $.ajax({
                    url: _settings.editAddressUrl,
                    data: param,
                    dataType: "json",
                    success: function (data) {
                        if (data.success) {

                            if (data.addressId) {//添加地址
                                param.ID = data.addressId;
                                addAddress([param], param);

                                if (param.defaultAddress) {
                                    $(".static", sc).removeClass("static");
                                }

                                scTitle.removeClass("disabled");
                            }
                            else {//修改地址
                                editAddress(param);

                                if (param.defaultAddress) {
                                    var addressPanel = $("tr[data-aid='" + param.ID + "']", sc);
                                    $(".static", sc).removeClass("static");
                                    $(".default", addressPanel).addClass("static");
                                }
                            }

                            hideEditAddress();
                        }
                        else {
                            if (data.exception && data.exception.shortMessage) {
                                $("#shipping-address-error").show()
                                .find(".error").text(data.exception.shortMessage);
                            }
                        }

                        btn.data("disable", false).removeClass("disabled")
                        .next().removeClass("disabled");
                    },
                    error: function () {
                        btn.data("disable", false).removeClass("disabled")
                        .next().removeClass("disabled");
                    },
                    type: "POST"
                });

            } else { //unlogin or login as a guest

                if (isAnoUser()) { //login as a guest
                    param.ID = 0;
                    if (aid === undefined) { // first
                        addAddress([param], param);
                    } else {
                        editAddress(param);
                    }
                    hideEditAddress();
                } else {

                    if (btn.data("disable") == "disable") {
                        return false;
                    } else {
                        btn.data("disable", "disable").addClass("disabled")
                    .next().addClass("disabled");
                    }

                    var email = $(".Email", scPanel).val();

                    if (email) {
                        param.email = email;
                        Pattaya.Checkout.LoginRegister.anonymousRegister(param, {
                            success: function (data) {
                                if (data.success) {
                                    param.ID = 0;
                                    addAddress([param], param);
                                    $("#Email").val(email);
                                    $("#emailInputPanel").hide()
                                        .find("#panel-email").data("valid", false);
                                    hideEditAddress();
                                    $("#btnLogin").data("guest-logined", true);
                                }

                                btn.data("disable", false).removeClass("disabled")
                                .next().removeClass("disabled");
                            },
                            error: function () {
                                $("#shipping-address-error").show()
                                .find(".error").text("Unknown error failed!");

                                btn.data("disable", false).removeClass("disabled")
                                .next().removeClass("disabled");
                            }
                        });
                    }
                }
            }

            return false;
        });

        $("#cancelAddress").click(function () {
            if ($(this).hasClass("disabled")) {
                return false;
            }

            if (!userEmail.val() && $("#btnLogin").length > 0) { //unlogin
                hideAddressOverlay();
                $("#btnLogin").click();
            } else {
                hideEditAddress();
            }

            return false;
        });

        $("#cancelBackToCart").on("click", function () {
            window.location.href = $(this).val();
        });


        $("#placeOrder").click(function () {
            var that = $(this);

            if (that.data("disabled")) {
                return false;
            } else if (that.data("computingcharges")) {

                var top = $("input:radio:checked", sc).closest("tr").offset().top;

                $('body,html').animate({
                    scrollTop: top
                }, 0);

                return false;
            } else if (that.data("computedcharges") === false) {
                var top = $("#shippingAddressError").offset().top;

                $('body,html').animate({
                    scrollTop: top
                }, 0);

                return false;
            } else {
                //validate address
                $.each(address, function (prop) {
                    if (prop == "CountryName") {
                        return;
                    }

                    var v = $("#" + prop).val();

                    if (prop == "CountryCode") {
                        var cn = $("li[data-countrycode='" + v + "']", scPanel).text();

                        $(".dropDownCountry .current", scPanel).data("countrycode", v).html(cn + ' <i></i>');
                    } else {
                        $("." + prop, scPanel).val(v);
                    }
                });

                if (!validateAddress()) {
                    var addressPanel = $("input:radio:checked", sc).closest("tr"),
                        top = $(".address_options", sc).offset().top;

                    //showing set as default?
                    if ($(".default", addressPanel).length > 0 && !$(".default", addressPanel).hasClass("static")) {
                        scPanel.find(".setDefault").show();
                    } else {
                        scPanel.find(".setDefault").hide();
                    }

                    showEditAddress();

                    $('body,html').animate({
                        scrollTop: top
                    }, 0);

                    scPanel.data("aid", $("input:radio:checked", sc).closest("tr").data("aid"));

                    return false;
                }

                that.data("disabled", true).addClass("disabled");
            }
        });

        scTitle.click(function () {

            if (scTitle.hasClass("disabled")) {
                return false;
            }

            if (scTitle.hasClass("on")) {
                //$(".dropDownCountry .current", scPanel).html(_lang.PleaseSelect + " <i></i>").data("countrycode", 0);

                $.each(address, function (prop) {
                    $("." + prop).val('');
                });

                scTitle.removeClass("none on")
                    .find("i").removeClass("up");

                scPanel.show().data("aid", -1).find(".setDefault").show();
                showAddressOverlay();

                $("#cancelAddress").show();
                $("#cancelBackToCart").hide();
                $("#saveAddress").text(_lang.Save);
            } else {
                hideEditAddress();
            }
        });

        Pattaya.Global.UI.dropdown(".dropDownCountry", {
            trigger: "click",
            delay: 0,
            fx: {
                type: 'none'
            },
            onChanged: function (item, curItem) {
                var selCountryCode = item.data("countrycode");

                curItem.data("countrycode", selCountryCode);

                $(".dropDownCountry").next(".infobox").hide();
            }
        });

        var pRules = commonRules;

        if ($("#payment-method-container input:radio:checked").val() == "EGP") {
            pRules = creditCardRules;
        } else if (_settings.payMethod == "ExpressCheckout") {
            pRules = paypalRules;
        }

        bindAddressValidation(pRules);

        //get address list
        (function () {
            if (!isLoginedUser()) {
                return;
            }

            var loading = $('<div class="showloader loadbox pad_tb10"></div>');
            $(".checkout_tab", sc).after(loading);

            $.ajax({
                url: _settings.getAddressListUrl,
                data: { count: _settings.AddressCount },
                success: function (data) {
                    var curP = $("tr.selected", sc);
                    if (data.success) {
                        var addresses = data.addresses;

                        if (addresses.length > 0) {

                            addresses[0].defaultAddress = true;
                            if (curP.length > 0) {
                                var aid = curP.data("aid");
                                if (aid != undefined) {
                                    if (aid == 0) {
                                        addAddress(addresses);
                                    } else {
                                        addAddress(addresses, null);
                                    }
                                }
                            } else {
                                addAddress(addresses, addresses[0]);
                            }
                        } else {
                            if (curP.length == 0) {
                                scTitle.click().addClass("disabled");
                                $("#cancelAddress").hide();
                            }
                        }

                        if (addresses.length >= 5) {
                            scTitle.hide();
                        }

                    } else {
                        if (curP.length == 0) {
                            scTitle.click().addClass("disabled");
                            $("#cancelAddress").hide();
                        }
                    }
                },
                complete: function () {
                    loading.remove();
                },
                type: "POST"
            });
        } ());

        $(function () {
            //do show layout?
            if (isAnoUser()) {
                if ($("#shipping-address-container .checkout_tab tr").length == 0) {
                    showAddressOverlay();
                }
            }
        });

        //shipping method
        var smList = $("#smList"),
            overlay = initOverlay();

        var showSMOverlay = function () {
            overlay.show();

            smList.parent().css({
                "position": "relative",
                "z-index": 100,
                "background": "#fff"
            });
        },
        hideSMOverlay = function () {
            overlay.hide();

            smList.parent().css({
                "position": "static",
                "z-index": "auto"
            });
        },
        hideEditShippingMethod = function () {
            $("tr:not(.selected)", smList).hide();
            $("#btnShippingMethod").hide();
            $("#smMore").show();
            hideSMOverlay();
        };

        $("td.name", smList).click(function () {
            var that = $(this);

            that.parent().addClass("selected")
            .siblings().removeClass("selected");

            $("input:radio", that).attr("checked", "checked");
        });

        $("#smMore").click(function () {
            $("tr", smList).each(function () {
                var that = $(this);

                if (!that.data("hidden")) {
                    that.show();
                }
            });
            $("#btnShippingMethod").show();
            $(this).hide();
            smList.data("shippingMethod", $("input:radio:checked", smList).val());
            showSMOverlay();
        });

        $("#saveShippingMethod").click(function () {

            var btn = $(this),
                sm = smList.data("shippingMethod"),
                curSM = $("input:radio:checked", smList).val();

            if (sm == curSM) {
                hideEditShippingMethod();
            } else {
                if (btn.data("disable") == "disable") {
                    return false;
                } else {
                    btn.data("disable", "disable").addClass("disabled")
                    .next().addClass("disabled");
                }

                getShippingCharges().done(function (data) {
                    if (data.success) {
                        hideEditShippingMethod();
                    }

                    btn.data("disable", false).removeClass("disabled")
                    .next().removeClass("disabled");
                }).fail(function () {
                    btn.data("disable", false).removeClass("disabled")
                    .next().removeClass("disabled");
                });
            }
            return false;
        });

        $("#cancelShippingMethod").click(function () {
            if ($(this).hasClass("disabled")) {
                return false;
            }

            var curShippingMethod = smList.data("shippingMethod");

            $("input:radio[value='" + curShippingMethod + "']", smList).attr("checked", "checked")
            .closest("tr").addClass("selected")
            .siblings().removeClass("selected");

            hideEditShippingMethod();

            return false;
        });

        //help: ship the available items first
        $(function () {

            Pattaya.Global.UI.tooltips("#fulfillmentPolicyHelp", {
                "template": $("#checkout-tips-panel").html(),
                "placement": "bottom",
                "offset": {
                    x: 90,
                    y: 10
                },
                "autoHide": 200
            });

            Pattaya.Global.UI.tooltips("#dropShippingServiceHelp", {
                "template": $("#checkout-tips-panel").html(),
                "placement": "bottom",
                "offset": {
                    x: 90,
                    y: 10
                },
                "autoHide": 200
            });
        });

        function getCurAddress() {
            var a = {};
            $.each(address, function (prop) {
                if (prop == "CounrtyName") {
                    a["CountryCode"] = $("#CountryCode").val();
                } else {
                    a[prop] = $("#" + prop).val();
                }
            });

            return a;
        }

        function getShippingCharges(address) {
            var data = {};

            if (!address || $.isEmptyObject(address)) {
                address = getCurAddress();
            }

            var addressId = $("#shipping-address-container input:radio:checked").closest("tr").data("aid");
            if (addressId && addressId != "0") {
                address.ID = addressId;
            }

            data = address;
            data.shippingMethod = $("input[name='shippingMethod']:checked").val();
            data.cartId = $("#cartId").val();

            return $.ajax({
                url: _settings.getShippingChargesUrl,
                data: data,
                success: function (data) {
                    if (data.success) {
                        var formatMoney = initMoney().format,
                            storeCredit = $("#storeCreditInfo").find(".price").data("price"),
                            giftCard = $("#giftCardInfo").find(".price").data("price"),
                            coupon = parseFloat(data.couponFee),
                            grandTotal = parseFloat(data.grandTotal);

                        $("#subtotal").find(".price").text(formatMoney(data.subTotal));

                        if (data.bulkrateFee > 0) {
                            $("#bulkrateFee").show().find(".price").text(formatMoney(data.bulkrateFee));
                        } else {
                            $("#bulkrateFee").hide();
                        }

                        $("#shippingFee").find(".price").text(formatMoney(data.shippingFee));

                        if (data.discountTotal > 0) {
                            $("#discountTotal").show().find(".price").text("- " + formatMoney(data.discountTotal));
                        } else {
                            $("#discountTotal").hide()
                        }

                        if (data.handlingFee > 0) {
                            $("#handlingFee").show().find(".price").text(formatMoney(data.handlingFee));
                        } else {
                            $("#handlingFee").hide();
                        }

                        if (data.packingFee > 0) {
                            $("#packingFee").show().find(".price").text(formatMoney(data.packingFee));
                        } else {
                            $("#packingFee").hide();
                        }

                        if (giftCard > grandTotal) {
                            if (storeCredit > 0) {
                                $("#storeCreditInfo").hide()
                                    .find(".price").data("price", 0);

                                $(".storeCreditPanel")
                                    .find(".expanded").click()
                                        .find(".title").text(function () {
                                            return $(this).data("otitle");
                                        })
                                    .end()
                                .end()
                                    .find(".inputBox").show()
                                    .next().hide();
                            }

                            giftCard = grandTotal;
                            grandTotal = 0;

                            $(".giftCardPanel").find(".discut, .code").text(formatMoney(giftCard));

                            $("#giftCardInfo")
                                .find(".price").data("price", giftCard).text("- " + formatMoney(giftCard));
                        } else if (giftCard + storeCredit > grandTotal) {
                            storeCredit = grandTotal - giftCard;
                            grandTotal = 0;

                            $("#storeCreditVal").text(function () {
                                var storeCreditVal = $(this).data("price");
                                return formatMoney(storeCreditVal - storeCredit)
                            });

                            $(".storeCreditPanel").find(".discut, .code").text(formatMoney(storeCredit));

                            $("#storeCreditInfo")
                                .find(".price").data("price", storeCredit).text("- " + formatMoney(storeCredit));
                        } else {
                            grandTotal = grandTotal - giftCard - storeCredit;
                        }

                        $("#checkout-summary-box .grandTotal").data("price", grandTotal).text(formatMoney(grandTotal));
                        $("#checkout-summary-box .points").text(Math.floor(grandTotal) / 10);

                        //set shippingmethods charges
                        $(".Expedited", smList).html(formatMoney(data.ShippingInfo.Expedited));
                        $(".Standard", smList).html(formatMoney(data.ShippingInfo.Standard));
                        $(".SuperSaver", smList).html(formatMoney(data.ShippingInfo.SuperSaver));
                    }
                },
                type: "POST"
            });
        }

        return function () {
            var curAddressEditBtn = $("#shipping-address-container tr.selected td .edit");
            if (curAddressEditBtn) {
                curAddressEditBtn.trigger("click");
                $("#saveAddress").trigger("click");
            }
        };
    };
    $.extend(_ns, { shipping: shipping });

    var paymentMethods = function () {
        var init = function () {
            //payment method
            $("#payment-method-container tr").click(function () {
                var that = $(this);

                if (that.hasClass("disabled")) {
                    return;
                }

                that.addClass("selected")
				.siblings().removeClass("selected");

                $("input:radio", that).attr("checked", "checked");

                if (that.hasClass("paypalPanel")) {
                    bindAddressValidation(paypalRules);
                } else if (that.hasClass("egp")) {
                    bindAddressValidation(creditCardRules);
                } else {
                    bindAddressValidation(commonRules);
                }
            });
        }

        var validPaypalMethod = function () {
            var shippingAddressContainer = $("#shipping-address-container");

            var curAddressRule = {
                "firstname": {
                    "val": $(".FirstName", shippingAddressContainer).text(),
                    "unvalidChars": _config.paypalUnvalidChars3
                },
                "lastname": {
                    "val": $(".LastName", shippingAddressContainer).text(),
                    "unvalidChars": _config.paypalUnvalidChars3
                },
                "street1": {
                    "val": $(".Street1", shippingAddressContainer).text(),
                    "unvalidChars": _config.paypalUnvalidChars1
                },
                "street2": {
                    "val": $(".Street2", shippingAddressContainer).text(),
                    "unvalidChars": _config.paypalUnvalidChars1
                },
                "city": {
                    "val": $(".City", shippingAddressContainer).text(),
                    "unvalidChars": _config.paypalUnvalidChars1
                },
                "state": {
                    "val": $(".State", shippingAddressContainer).text(),
                    "unvalidChars": _config.paypalUnvalidChars1
                },
                "postalcode": {
                    "val": $(".PostalCode", shippingAddressContainer).text(),
                    "unvalidChars": _config.paypalUnvalidChars2
                },
                "phonenumber": {
                    "val": $(".PhoneNumber", shippingAddressContainer).text(),
                    "unvalidChars": _config.paypalUnvalidChars2
                }
            };

            var validChars = function (val, arr) {
                var result = true;

                $.each(arr, function (i, c) {
                    if (val.indexOf(c) > -1) {
                        result = false;

                        return false;
                    }
                });

                return result;
            };

            for (var i in curAddressRule) {
                var result = validChars(curAddressRule[i].val, curAddressRule[i].unvalidChars);

                if (result === false) {
                    $("#payment-method-container tr.paypalPanel").addClass("disabled");

                    break;
                }
            }

        };

        return {
            init: init,
            validPaypalMethod: validPaypalMethod
        }
    };

    $.extend(_ns, { paymentMethods: paymentMethods() });


    var orderOptions = function (settings) {
        var _settings = $.extend(true, {
            "useGiftCardUrl": "",
            "useCouponCodeUrl": "",
            "paymentCookieKey": "cc_pm",
            "domain": ".dx.com"
        }, settings);

        var ooContainer = $("#order-options-container");

        function renderError(input, msg) {
            var html = '<span class="oo_error_panel"><i class="icon_error"></i><span class="error"></span></span>',
                p = input.parent();

            if ($(".oo_error_panel", p).length > 0) {
                $(".oo_error_panel", p).show().find(".error").html(msg);
            } else {
                var $html = $(html);

                $html.find(".error").html(msg);

                p.append($html);
            }
        }

        //store credit
        var _money = initMoney(),
            changeToDecimal = function (num) {
                return Math.round(num * 100) / 100;
            },
        /*
        recordPayMethod = function () {
        var payment = $("#payment-method-container input:checked").val();

        $.cookie(_settings.paymentCookieKey, payment, {
        path: "/",
        domain: _settings.domain
        });

        },
        */
            _validStoreCredit = function (val, fStoreCredit, grandTotal) {
                var fVal;

                var reg = new RegExp("^[0-9]?([\.|\,|" + " " + "]?[0-9]+)+$");

                if (!reg.test(val)) {
                    return -1;
                }

                fVal = _money.unformat(val);

                if (fStoreCredit > grandTotal) {
                    if (fVal > grandTotal) {
                        //fVal = grandTotal;
                        return -2;
                    }
                } else {
                    if (fVal > fStoreCredit) {
                        fVal = fStoreCredit;
                        //return -3;
                    }
                }

                return fVal;
            },
            useStoreCredit = function (input) {
                var grandTotalBox = $("#checkout-summary-box .grandTotal"),
                    grandTotal = grandTotalBox.data("price"),
                    storeCredit = $("#storeCreditVal").data("price");

                val = input.val();
                grandTotal = parseFloat(grandTotal);
                storeCredit = parseFloat(storeCredit);

                if (val.length == 0) {
                    renderError(input, _lang.Required);
                    input.focus();
                }

                var validVal = _validStoreCredit(val, storeCredit, grandTotal);

                validVal = changeToDecimal(validVal);

                if (validVal < 0) {
                    var error;

                    if (validVal === -1) {
                        error = _lang.InvalidInput;
                    } else if (validVal === -2) {
                        error = _lang.YouNeedPay + " " + _money.format(grandTotal);

                        input.val(_money.format(grandTotal, "", ""));
                    }
                    //else if (validVal === -3) {
                    //    error = _lang.ExceedsCreditLimit;

                    //    input.val(_money.format(storeCredit, "", ""));
                    //}

                    renderError(input, error);
                    input.focus();
                } else if (validVal == 0) {
                    renderError(input, _lang.InvalidInput);
                    input.focus();
                } else {
                    var showPanel = input.parent().next();

                    input.val('').parent().hide();
                    showPanel
                        .find(".discut, .code").text(_money.format(validVal))
                    .end().show();

                    $("#storeCreditInfo")
                        .find(".price").data("price", validVal).text("- " + _money.format(validVal))
                    .end().show();

                    showPanel.parent().prev()
                        .find("#storeCreditVal").text(_money.format(storeCredit - validVal));

                    grandTotalBox.data("price", changeToDecimal(grandTotal - validVal)).text(_money.format(grandTotal - validVal));

                    var points = Math.floor(grandTotal - validVal) / 10,
						pointsTxt = $("#checkout-summary-box .points");

                    if (points == 0) {
                        pointsTxt.parent().hide();
                    } else {
                        pointsTxt.text(points).parent().show();
                    }

                    $("#storeCredit").val(validVal);

                    input.parent().find(".oo_error_panel").hide();
                }
            },
            removeStoreCredit = function (panel) {
                var grandTotalBox = $("#checkout-summary-box .grandTotal"),
                    grandTotal = grandTotalBox.data("price"),
                    storeCreditInfo = $("#storeCreditInfo"),
                    usedStoreCredit = storeCreditInfo.find(".price").data("price");

                panel
                    .find(".inputBox").show()
                .end()
                    .find(".showBox").hide()
                .end()
                    .find("#storeCreditVal").text(function () {
                        var storeCredit = $(this).data("price");
                        return _money.format(storeCredit);
                    })
                .end()
                    .find(".title").text(function () {
                        return $(this).data("otitle");
                    });

                grandTotal = changeToDecimal(grandTotal + usedStoreCredit);

                grandTotalBox.data("price", grandTotal).text(_money.format(grandTotal));

                storeCreditInfo
                    .find(".price").data("price", 0)
                .end().hide();

                var points = Math.floor(grandTotal) / 10,
					pointsTxt = $("#checkout-summary-box .points");

                if (points == 0) {
                    pointsTxt.parent().hide();
                } else {
                    pointsTxt.text(points).parent().show();
                }

                $("#storeCredit").val('0');
            };

        //other card
        var useCard = function (input, url, param, options) {
            var btn = input.next();

            btn.addClass("disabled").after(HTML_LOADING);
            btn.parent().find(".oo_error_panel").hide();

            param.cartId = $("#cartId").val();

            $.ajax({
                url: url,
                data: param,
                cache: false
            }).done(function (data) {
                if (data.success) {

                    btn.parent().hide();
                    input.val('');

                    if ($.isFunction(options.success)) {
                        options.success(data);
                    }
                } else {
                    renderError(input, data.exception && data.exception.shortMessage || "");
                }
            }).fail(function () {
                renderError(input, _lang.SystemError);
            }).always(function () {
                btn.removeClass("disabled").next(".icon_loader").remove();
            });
        },
        useGiftCard = function (input) {
            var cardNo = $.trim(input.val()),
				payment = $("#payment-method-container input:checked").val();

            if (cardNo.length == 0) {
                input.focus();
                renderError(input, _lang.Required);
                return false;
            }

            useCard(input, _settings.useGiftCardUrl, {
                cardNo: cardNo,
                PaymentMethod: payment
            }, { success: function (data) {

                /* recordPayMethod(); */

                window.location.reload();

                /*
                var grandTotal = $("#checkout-summary-box .grandTotal").data("price"),
                giftCardValue = parseFloat(data.giftCardValue),
                usedGiftCardValue = giftCardValue;

                if (giftCardValue > grandTotal) {
                usedGiftCardValue = grandTotal;
                }

                grandTotal = changeToDecimal(grandTotal - usedGiftCardValue);

                input.parent().next()
                .find(".discut").text(_money.format(usedGiftCardValue))
                .end()
                .find(".exp").text(function () {
                if (data.willExpire) {
                $(this).css("color", "#f00");
                } else {
                $(this).css("color", "#333");
                }

                return data.giftCardValidDate;
                })
                .end()
                .find(".code").text(cardNo)
                .end().show();

                $("#giftCardInfo")
                .find(".price").data("price", usedGiftCardValue).text("- " + _money.format(usedGiftCardValue))
                .end().show();

                $("#checkout-summary-box .grandTotal").data("price", grandTotal).text(_money.format(grandTotal));
                $("#checkout-summary-box .points").text(Math.floor(grandTotal) / 10);
                $("#giftCardValue").val(usedGiftCardValue);
                $("#giftCardCode").val(cardNo);

                //check payment methods
                var availablePayment = data.availablePayment,
                arrPayments,
                hasDisabled = false;

                if (!availablePayment || availablePayment != "All") {
                arrPayments = availablePayment.split(',');

                $("#payment-method-container input:radio").each(function (i, ele) {
                var that = $(ele),
                val = that.val();

                if ($.inArray(val, arrPayments) == -1) {
                that.attr("disabled", "disabled").closest("tr").addClass("disabled");
                hasDisabled = true;
                }
                });
                }

                if (hasDisabled) {
                $("#pmError").show().find(".txt").html(_lang.OnlyPayMentError);
                } else {
                $("#pmError").hide();
                }*/
            }
            });
        },
        useCouponCode = function (input) {

            var couponCode = $.trim(input.val());
            if (couponCode.length == 0) {
                input.focus();
                renderError(input, _lang.Required);
                return false;
            }

            var use = function (success) {
                useCard(input, _settings.useCouponCodeUrl, {
                    coupon: $.trim(input.val())
                }, { success: success
                });
            };

            if ($("#bulkrateFee").find(".price").data("price") > 0) {

                var tooltipsApplyCoupon = input.data("tooltipsApplyCoupon");

                var success = function () {
                    /* recordPayMethod(); */

                    window.location.reload();
                };

                if (tooltipsApplyCoupon) {
                    tooltipsApplyCoupon.show();
                } else {
                    tooltipsApplyCoupon = Pattaya.Global.UI.tooltips(input.next()[0], {
                        "template": $("#tooltips-applycoupon-confirm").html(),
                        "placement": "bottom",
                        "trigger": "click",
                        "offset": {
                            x: 0,
                            y: 10
                        },
                        "init": function () {
                            this.off("click", ".yes").on("click", ".yes", function () {

                                use(success);

                                tooltipsApplyCoupon.hide();

                                return false;
                            }).off("click", ".no").on("click", ".no", function () {

                                tooltipsApplyCoupon.hide();

                                return false;
                            });
                        },
                        "align": "left",
                        "type": "popup"
                    });

                    input.data("tooltipsApplyCoupon", tooltipsApplyCoupon);
                }
            } else {

                var success = function (data) {

                    window.location.reload();

                    return;
                }

                use(success);
            }
        },
        removeCard = function (panel, url, param, options) {

            var btn = panel.find(".submit_icon");
            btn.removeClass("submit_icon").addClass("icon_loader").data("disabled", true);

            param.cartId = $("#cartId").val();

            $.ajax({
                url: url,
                data: param,
                cache: false
            }).done(function (data) {
                if (data.success) {
                    if ($.isFunction(options.success)) {
                        options.success();
                    }

                } else {
                    renderError(btn, data.exception && data.exception.shortMessage || "");
                }
            }).fail(function () {
                renderError(btn, _lang.SystemError);
            }).always(function () {
                btn.removeClass("icon_loader").addClass("submit_icon").data("disabled", false);
            });
        }
        removeGiftCard = function (panel) {
            var success = function () {

                /*recordPayMethod();*/

                window.location.reload();

                /*
                var grandTotalBox = $("#checkout-summary-box .grandTotal"),
                grandTotal = grandTotalBox.data("price"),
                giftCardInfo = $("#giftCardInfo"),
                usedGiftCard = giftCardInfo.find(".price").data("price");

                panel
                .find(".inputBox").show()
                .end()
                .find(".showBox").hide()
                .end()
                .find(".title").text(function () {
                return $(this).data("otitle");
                });

                grandTotal = changeToDecimal(grandTotal + usedGiftCard);

                grandTotalBox.data("price", grandTotal).text(_money.format(grandTotal));

                giftCardInfo
                .find(".price").data("price", 0)
                .end().hide();

                $("#checkout-summary-box .points").text(Math.floor(grandTotal) / 10);
                $("#giftCardValue").val('0');
                $("#giftCardCode").val('');            
                */
            };

            removeCard(panel, _settings.useGiftCardUrl, {
                cardNo: ""
            }, {
                success: success
            });

        },
        removeCouponCode = function (panel) {
            var success = function () {
                panel
                    .find(".inputBox").show()
                .end()
                    .find(".showBox").hide()
                .end()
                    .find(".title").text(function () {
                        return $(this).data("otitle");
                    });

                /* recordPayMethod();*/

                window.location.reload();

                return;

            };

            removeCard(panel, _settings.useCouponCodeUrl, {
                coupon: ""
            }, {
                success: success
            });
        };

        $("h3", ooContainer).each(function () {

            var that = $(this),
                role = that.next().find(".checkout_gift_card").data("role"),
                panel = that.parent();

            if (panel.hasClass("coupon_unable") || panel.hasClass("giftcard_unable")) {
                $(function () {
                    Pattaya.Global.UI.tooltips(that[0], {
                        "template": $("#checkout-tips-panel-lb").html(),
                        "placement": "top",
                        "offset": {
                            x: 0,
                            y: 10
                        },
                        "autoHide": 200
                    });
                });
            } else {
                that.click(function () {
                    that.siblings('.detiles').toggle();
                    if (!that.siblings('.detiles').is(':hidden')) {
                        that.addClass("expanded").find('i').attr('class', 'reduce_icon');
                        that.next().find(".inputBox input:text").focus();
                    } else {
                        that.removeClass("expanded").find('i').attr('class', 'plus_icon');

                        if (role == "sc") {
                            that.text(that.data("otitle"));
                        }
                    }
                });
            }
        });

        $(".checkout_gift_card", ooContainer).click(function () {
            var that = $(this);

            if (that.hasClass("disabled")) {
                return false;
            }

            var input = that.prev("input"),
                panel = that.closest(".summaryList");

            //storeCredit
            if (panel.hasClass("storeCreditPanel")) {
                useStoreCredit(input);
            } else if (panel.hasClass("couponCodePanel")) {
                useCouponCode(input);
            } else if (panel.hasClass("giftCardPanel")) {
                useGiftCard(input);
            }
        });

        $(".submit_icon", ooContainer).click(function () {
            var that = $(this);

            if (that.data("disabled")) {
                return false;
            }

            var panel = that.closest(".summaryList");

            if (panel.hasClass("storeCreditPanel")) {
                removeStoreCredit(panel);
            } else if (panel.hasClass("couponCodePanel")) {
                removeCouponCode(panel);
            } else if (panel.hasClass("giftCardPanel")) {
                removeGiftCard(panel);
            }

        });

        $(".input", ooContainer).keydown(function (e) {
            var that = $(this),
                ev = window.event ? window.event : e;

            if (ev.keyCode === 13) {
                that.next().trigger("click");

                ev.preventDefault();
            }
        });

        //        if ($("#payment-method-container .disabled").length > 0) {
        //            $("#pmError").show().find(".txt").html(_lang.OnlyPayMentError);
        //        }

        //set payment method
        (function () {
            var paymethod = $.cookie(_settings.paymentCookieKey);

            if (paymethod) {

                $("#payment-method-container input[value='" + paymethod + "']").closest("tr").click();
                forbiddenPayMenthod = true;
            }
        } ());
    };
    $.extend(_ns, { orderOptions: orderOptions });

    (function () {
        var _settings,
        guestLogin = function (dialog) {
            var btn = this;

            if (btn.hasClass("disabled")) {
                return;
            } else {
                btn.addClass("disabled");
            }

            var email = $("#Email").val();

            if (email) {
                var error = function (msg) {
                    btn.after('<span class="error_info"><i class="lr_icon_error"></i>' + msg + '<span>');
                };

                anonymousRegister({ email: email }, {
                    success: function (data) {
                        if (data.success) {
                            $("#btnLogin").data("guest-logined", true);
                            dialog.close();
                            var addr=$("#saveAddress");
                            if(addr){
                            	addr.trigger('click');
                            }
                        } else {
                            error("Failed!");
                        }
                    },
                    error: function () {
                        error("Unknown error happened!");
                    }
                });
            } else {
                dialog.close();
                $("#emailInputPanel").show()
                    .find("#panel-email").data("valid", true);
                $("#shipping-address-container .address_options").css({
                    "position": "relative",
                    "z-index": 100,
                    "background": "#fff"
                });
                initOverlay().show();
            }
        },
        _login = function () {
            var btn = $(this),
                passportRootUrl,
                showGuest = true,
                showClose = false;

            if ($("#btnLogin").data("guest-logined")) {
                showGuest = false;
                showClose = true;
            }

            var href = btn.attr("href"),
            urlParser = Pattaya.Global.Utils.urlParser(href);

            passportRootUrl = urlParser.get("protocol") + "//" + urlParser.get("host");

            Pattaya.LoginOrSignUp.set({
                "passportRootUrl": passportRootUrl,
                "cookieDomain": _settings.cookieDomain
            }).login({
                "closeDirect": true,
                "showGuest": showGuest,
                "showClose": showClose,
                "guestEvent": guestLogin
            });

            return false;
        };

        function anonymousRegister(data, options) {
            return $.ajax({
                url: _settings.anonymousRegisterUrl,
                data: data,
                success: options.success,
                error: options.error,
                type: "POST"
            });
        }

        function init(settings) {
            _settings = $.extend(_settings, settings);

            var btnLogin = $("#btnLogin");

            btnLogin.click(_login);

            if (!btnLogin.data("guest-logined")) {
                btnLogin.click();
            }
        }

        $.extend(_ns, {
            LoginRegister: {
                init: init,
                anonymousRegister: anonymousRegister
            }
        });
    } ());

    var init = function () {
        //report error
        $(function () {
            var reportErrorPanel = $(".reportErrorPanel"),
                reportErrorDialog,
                format = Pattaya.Global.Utils.format;

            var tipSuccess = function (msg) {
                var tipsPanel = $(".tipsPanel").html(),
                $tip = $(tipsPanel.replace('_msg_', msg));

                var tips = Pattaya.Global.UI.dialog($tip, { buttons: false, customClass: "pattaya_tips", width: 350, type: 'tip', modal: false, autoClose: 5000 });
                $tip.find(".close").click(function () {
                    tips.close();
                });
            },
            showErrorMsg = function (msg, reportErrorPanelT) {
                $(".errorInfo", reportErrorPanelT).show().find(".errorInfoMsg").text(msg);
            },
            validate = function ($ele) {
                var val = $.trim($ele.val()),
                    result = true,
                    errorMsg;

                if (val.length == 0) {
                    var name = $ele.closest("li").find(".lbl").text();
                    showErrorMsg(format(_lang.FiledRequired, name));
                    $ele.addClass("inutError").focus();

                    result = false;
                }

                return result;
            };

            $(".btnSubmit", reportErrorPanel).click(function () {
                var reportErrorPanelT = $(this).closest(".reportErrorPanel");

                var $title = $(".txt", reportErrorPanelT),
                    $content = $(".NotesCancel", reportErrorPanelT);

                if (!validate($title) || !validate($content)) {
                    return false;
                }

                reportErrorDialog.dialog.append('<div class="showloader overlay loadModal"></div>');
                reportErrorDialog.overlay.off("click");

                $.ajax({
                    url: $("#reportError").attr("href"),
                    data: {
                        title: $title.val(),
                        content: $content.val(),
                        sourcePage: location.pathname
                    },
                    type: "POST",
                    success: function (data) {
                        if (data) {
                            if (data.success) {
                                reportErrorDialog.close();
                                tipSuccess(format('<p style="font-weight:bold">{0}</p>', _lang.ReportSuccess));
                            } else if (data.msg) {
                                showErrorMsg(data.msg, reportErrorPanelT);
                            }
                        }
                    },
                    complete: function () {
                        reportErrorDialog.dialog.find('.loadModal').remove();
                    }
                });
            });

            $(".btnCancel", reportErrorPanel).click(function () {
                reportErrorDialog.close();
                return false;
            });

            $("#reportError").click(function () {
                var reportError = reportErrorPanel.clone(true);
                reportErrorDialog = Pattaya.Global.UI.dialog(reportError, { buttons: false, title: _lang.ReportError, width: 550 });

                return false;
            }).show();
        });


    };

    init();
} (window, Pattaya, jQuery));
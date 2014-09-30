;(function ($, window, document, undefined) {

    // Create the defaults once
    var validateNicely = "validateNicely",
        defaults = {
            errorClass: "error",
            errorMessages: {
                required: "This field is required",
                email: "The email is not valid",
                numeric: "Wrong numeric format"
            },
            validationType: "inline" //inline, label, alert
        };

    function Validator(plugin) {

        var pluginObj = plugin, defaultErrors = plugin.settings.errorMessages,
                        errorClass = plugin.settings.errorClass;

        return {
            validateEmpty: function (input) {
                var requiredErrorMessage = this.assignErrorMessages("required", input);

                if (pluginObj.utils.isEmpty(input)) {
                    input.addClass(errorClass);
                    if (pluginObj.settings.validationType === "inline") {
                        input.val(requiredErrorMessage);
                    }
                }
                else {
                    if (pluginObj.settings.validationType === "inline") {
                        if (input.val() !== requiredErrorMessage)
                            input.removeClass(errorClass);
                    }
                }
            },

            assignErrorMessages: function(error, input){
                var inputErrorMsgAttr = input.attr("data-"+error+"-message");
                return typeof(inputErrorMsgAttr) !== "undefined" ? inputErrorMsgAttr : defaultErrors.required;
            }
        };
    }

    // The actual plugin constructor
    function Plugin(element, options) {
        this.form = element;
        this.submitButtons = "*[data-submit]";
        this.requiredFields = "*[data-required]";
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = validateNicely;
        this.validator = new Validator(this);
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        utils: {
            isEmpty: function (e) {
                return $.trim(e.val()) === "";
            }
        },
        init: function () {
            this.initSubmitButtons();
            this.addOrRemoveInputErrors();
        },
        initSubmitButtons: function () {
            var form = this.form, required = this.requiredFields, pluginObj = this;
            $(form).on("click", this.submitButtons, bindSubmitClick);

            function bindSubmitClick() {
                $(form).find(required).trigger("blur");
                pluginObj.sendForm();
                return false;
            }
        },
        addOrRemoveInputErrors: function () {
            var pluginObj = this;
            $(this.form).on("blur keyup", this.requiredFields, addOrRemoveErrorClass);
            // Call all events here
            function addOrRemoveErrorClass(e) {
                pluginObj.validator.validateEmpty( $(e.target) );
            }
        },
        sendForm: function () {
            var errorClass = "." + this.settings.errorClass;
            if ($(this.form).find(errorClass).length === 0) {
                var url = $(this.form).attr("action"), data = $(this.form).serializeObject();
                $.post(url, data, function () {
                });
            }
        }
    });
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ validateNicely ] = function (options) {

        this.each(function () {
            if (!$.data(this, "plugin_" + validateNicely)) {
                if (!$.data(this, "original_form")) {
                    originalHtmlForm = $("<div />").append($(this).eq(0).clone()).html();
                    $.data(this, "original_html_form", originalHtmlForm);
                }
                $.data(this, "plugin_" + validateNicely, new Plugin(this, options));
            }
        });

        this.destroy = function () {
            this.each(function () {
                $(this).replaceWith($.data(this, "original_html_form"));
            });
        };

        return this;
    };

    $.fn.serializeObject = function(){
        var object = {}, arrayOfDataObjects = this.serializeArray();

        $.each(arrayOfDataObjects, function() {
            if (object[this.name]) {
                if (!object[this.name].push)
                    object[this.name] = [object[this.name]];

                object[this.name].push(this.value || '');
            } else {
                object[this.name] = this.value || '';
            }
        });
        return object;
    };

})(jQuery, window, document);

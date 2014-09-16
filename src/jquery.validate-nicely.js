;(function ($, window, document, undefined) {

    // Create the defaults once
    var validateNicely = "validateNicely",
        defaults = {
            errorClass: "error"
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.form = element;
        this.submitButtons = "*[data-submit]";
        this.requiredFields = "*[data-required]";
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = validateNicely;
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
            this.disableSubmitButtons();
            this.addRemoveErrorsOnRequiredElements();
            // TODO send if not errors are found
        },
        disableSubmitButtons: function () {
            var form = this.form, required = this.requiredFields;
            $(form).on("click", this.submitButtons, bindSubmitClick);
            function bindSubmitClick() {
                $(form).find(required).trigger("blur");
                return false;
            }
        },
        addRemoveErrorsOnRequiredElements: function () {
            $(this.form).on("blur keyup", this.requiredFields, addOrRemoveErrorClass);
            var errorClass = this.settings.errorClass;

            function addOrRemoveErrorClass(e) {
                var element = $(e.target);
                if (Plugin.prototype.utils.isEmpty(element))
                    element.addClass(errorClass);
                else
                    element.removeClass(errorClass);
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

})(jQuery, window, document);

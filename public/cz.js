
function checkForErrors(originalMessage, $form){
    if($(document).find('.error:visible').length > 0 &&
      !$('#card-element').hasClass('StripeElement--complete')  
    ){
        disableSubmitButton(originalMessage, $form);
    }
    else{
        enableSubmitButton(originalMessage, $form);
    }
};

function createToken(stripe, card) {

    stripe.createToken(card).then(function(result) {
        if (result.error) {

            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;

            // Problem!
            console.log("In response handler");
            // Show the errors on the form:
            alert('There was a problem subscribing you.');
            console.log(result.error);
        } else {

            // Send the token to your server
            stripeResponseHandler(result.token, result);
        }
    });
};

function disableSubmitButton(originalMessage, $form){
    $('.btn').prop('disabled', true);
    $form.find('.submit').prop('disabled', true);
    $form.find('.submit').val('Correggi errori');
};

function enableSubmitButton(originalMessage, $form){
    $('.btn').prop('disabled', false);
    $form.find('.submit').prop('disabled', false);
    $form.find('.submit').val(originalMessage);
};

function stripeResponseHandler(token, response) {
    // Grab the form:
    var $form = $('#cz_embed_form');

    console.log("Stripe call was successful");
    // Get the token ID:

    console.log(response);

    // Insert the token ID into the form so it gets submitted to the server:
    var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      document.getElementById('cz_embed_form').appendChild(hiddenInput);

    // Submit the form:
    $form.get(0).submit();
};

$(document).ready(function() {

    console.log('embed-billing.js loaded');

    var $form = $('#cz_embed_form');

    var originalMessage = $form.find('.submit').val();

    var stripe;

    if(typeof testKey !== "undefined" && testKey.length > 0){
        stripe = Stripe(testKey);
    }
    else if(typeof stripePubKey !== "undefined" && stripePubKey.length > 0){
        stripe = Stripe(stripePubKey);    
    }
    else{
        console.log('There was an error setting the Stripe publishable key.');
    }

    var elements = stripe.elements();
    var card = elements.create('card');
    card.mount('#card-element');

    var $required = $('input,textarea,select').filter('[required]:visible');

    $required.on('focusout', function(event){
        console.log('changed');
        event.preventDefault();

        setTimeout( function(){
            checkForErrors(originalMessage, $form);
        },50);
    });

    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');

        if (event.error) {
            displayError.textContent = event.error.message;
            disableSubmitButton(originalMessage, $form);
        } else {
            displayError.textContent = '';
            enableSubmitButton(originalMessage, $form);
        }
    });

    // validation rules
    $form.validate({
        invalidHandler: function(event, validator){
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {
                console.log(errors);
                // Disable the submit button to prevent repeated clicks:
                $('.btn').prop('disabled', true);
                $form.find('.submit').prop('disabled', true);
                $form.find('.submit').val('Correggi Errori');
            } else {
                // Re-enable button
                $('.btn').prop('disabled', false);
                $form.find('.submit').prop('disabled', false);
                $form.find('.submit').val(originalMessage);
            }

        },

        submitHandler: function(form){
            console.log('Form submitted');

            $form.find('.submit').val('Subscribing');

            // Disable the submit button to prevent repeated clicks:
            $form.find('.submit').prop('disabled', true);
            createToken(stripe, card);
        }
    });

});
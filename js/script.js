$(function(){
    
        $(".navbar a, footer a").on("click", function(event){
        
            event.preventDefault();
            var hash = this.hash;
            
            $('body,html').animate({scrollTop: $(hash).offset().top} , 900 , function(){window.location.hash = hash;})
            
        });

        $('.navbar-collapse').click('li', function() {
            $('.navbar-collapse').collapse('hide');
        });

        // AJAX de formulaire

        $('#contact-form').submit(function(e) {
            e.preventDefault();
            $('.comments').empty();
            var postdata = $('#contact-form').serialize();
            
            $.ajax({
                type: 'POST',
                url: 'php/contact.php',
                data: postdata,
                dataType: 'json',
                success: function(json) {
                     
                    if(json.isSuccess) 
                    {
                        $('#contact-form').append("<p class='thank-you'>Votre message a bien été envoyé. Merci de m'avoir contacté :)</p>");
                        $('#contact-form')[0].reset();
                    }
                    else
                    {
                        $('#firstname + .comments').html(json.firstnameError);
                        $('#name + .comments').html(json.nameError);
                        $('#email + .comments').html(json.emailError);
                        $('#phone + .comments').html(json.phoneError);
                        $('#subject + .comments').html(json.subjectError);
                        $('#message + .comments').html(json.messageError);
                        $('p.thank-you').empty();                        
                    }                
                }
            });
        });
    
    })
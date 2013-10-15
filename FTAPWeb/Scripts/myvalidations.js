
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

$.validator.addMethod("maxlength", function (value, element, len) {
    return value == "" || value.length <= len;
});

$(document).ready(function() 
{
    // validate the comment form when it is submitted
    //$("#CompanySignupForm").validate();
    //$("#UserSignUpForm").validate();

    $('#usersignup').click(function () {
        if ($("#UserSignUpForm").valid()) {
            if ($("#agreeU").is(':checked')) {
                SaveUser($('#username').val(), 'U', $('#password').val());
            }
            else {
                alert('Accept Terms and Conditions to continue.');
            }
        }
    });

    $('#companysignup').click(function () {
        if ($("#CompanySignupForm").valid())
        {
            if ($("#agreeC").is(':checked'))
            {

                /*var email = $('#companyname').val();
                email = email.replace(' ', '');
                email = email.toLocaleLowerCase();
                var regex = new RegExp("^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@(" + email + ").(([a-zA-z]+){2,5})$");
                var result = regex.test($("#email").val());
                if (result)
                {*/
                    SaveCompany($('#companyname').val(), $('#firstname').val(), $('#lastname').val(), $('#email').val(), $('#phone').val(), $('#cpassword').val())
                /*}
                else
                {
                    alert('Email id should be of Company Name specified.');
                }*/

            }
            else {
                alert('Accept Terms and Conditions to continue.');
            }
        }
    });

    $('#userlogin').click(function () {
        if ($('#UserLoginForm').valid())
        {
            ValidateUser($('#uemail').val(), $('#upassword').val(), 'U');
        }
    });

    $('#companylogin').click(function () {
        if ($('#CompanyLoginForm').valid())
        {
            ValidateUser($('#cmemail').val(), $('#cmpassword').val(), 'CU');
        }
    });

    $("#UserSignUpForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
                maxlength:50,
                email2: true,
                alphanumeric: false
            },
            password: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            confirmpassword: {
                required: true,
                minlength: 5,
                maxlength: 50,
                equalTo: "#password"
            },
            messages: {
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters",
                    maxlength: "Your usernamef must be less than 50 characters.",
                    email2: "Your Email Address must be in the format name@domain.com",
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    maxlength: "Your password must be less than 50 characters."
                },
                confirmpassword: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    maxlength: "Your password must be less than 50 characters.",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address"
            }
        }
        ,
        //agreeU: "Please accept our policy",
        errorClass: 'error',
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element)
        {

            $(element).removeClass();
            ////offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');
            error.addClass('error_outr');  // add a class to the wrapper
            error.insertAfter(element);
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });

    // validate signup form on keyup and submit
    $("#CompanySignupForm").validate({
        rules: {
            companyname: {
                required: true,
                minlength: 3,
                maxlength:50,
		        alphanumeric:true
            },
            firstname: {
                required: true,
                minlength: 2,
                maxlength:50,
                lettersonly: true
            },
            lastname: {
                required: true,
                minlength: 2,
                maxlength:50,
                lettersonly: true
            },
            username: {
                required: true,
                minlength: 5,
                maxlength: 50,
                email2:true
            },
            cpassword: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            cconfirmpassword: {
                required: true,
                minlength: 5,
                maxlength: 50,
                equalTo: "#cpassword"
            },
            email: 
                {
                    minlength: 5,
                    required: true,
                    email2: true
            },
            phone: {
                required: true,
                minlength: 4,
                maxlength:11,
                phoneUS: true
            }//,
           // agree: "required"
        }
        ,
        messages: {
            companyname:
                {
                    required: "Please enter your company name",
                    minlength: "Your companyname must consist of at least 3 characters",
                    maxlength: "Your company must be less than 50 characters.",
		            alphanumeric:"Please enter valid company name."
                },
            firstname:
                {
                    required: "Please enter your firstname",
                    lettersonly: "Please enter a valid firstname",
                    maxlength: "Your first name must be less than 50 characters."
                },
            lastname:
                {
                    required: "Please enter your lastname",
                    lettersonly: "Please enter a valid lastname",
                    maxlength: "Your last name must be less than 50 characters."
                },
            username: {
                required: "Please enter a username",
                minlength: "Your email must consist of at least 5 characters",
                maxlength: "Your email must be less than 50 characters.",
                email2: "Your Email Address must be in the format name@domain.com"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                maxlength: "Your password must be less than 50 characters."
            },
            confirmpassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                maxlength: "Your password must be less than 50 characters.",
                equalTo: "Please enter the same password as above"
            },
            email:
                {
                    required:"Please enter a valid email address",
                    minlength: "Your username must consist of at least 5 characters",
                    email2: "Your Email Address must be in the format name@domain.com"
                },
            phone:
		{
                	required:"Please enter a valid phone number",
			minlength: "Your phone must be at least 4 digits long"
		},

            agree: "Please accept our policy"
        }
        ,
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element)
        {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');
            error.addClass('error_outr');  // add a class to the wrapper
            error.insertAfter(element);

            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });


    $('#CompanyLoginForm').validate({
        rules: {
            cmemail:{
                required: true,
                email2: true
            },
            cmpassword: {
                required: true,
                minlength: 5,
                maxlength: 50
            }
        },
        messages: {
            cmemail: "Please enter a valid email address",
            cmpassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                maxlength: "Your password must be less than 50 characters."
            }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');

            error.addClass('error_outr');  // add a class to the wrapper
            error.insertAfter(element);

            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });

    $('#UserLoginForm').validate({
        rules: {
            uemail:
            {
                required: true,
                email2: true
            },
            upassword:
            {
                required: true,
                minlength: 5
            }
        },
        messages: {
            uemail:
                {
                    required:"Please enter email address",
                    email2:"Please enter a valid email address"
                },
            upassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');

            error.addClass('error_outr');  // add a class to the wrapper
            error.insertAfter(element);

            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });


    $("#compPassChange").validate({
        rules: {
            cmpcoldpass:
            {
                required: true,
                minlength: 5
            },
            cmpcnewpass:
            {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            cmpcnewcpass:
            {
                required: true,
                minlength: 5,
                maxlength: 50,
                equalTo: "#cmpcnewpass"

                
            }
        },
        messages: {
            cmpcoldpass:
                {
                    required: "Please enter email address",
                    minlength: "Your password must be at least 5 characters long"
                },
            cmpcnewpass: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                maxlength: "Your password must be less than 50 character"
            },
            cmpcnewcpass:
                {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    maxlength: "Your password must be less than 50 character",
                    equalTo: "Password Mismatch"

                }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');

            error.addClass('error_outr');  // add a class to the wrapper
            //error.insertAfter(element);
            error.insertBefore(element)
            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });

    $('#compPassChange').click(function ()
    {
        if ($("#companychangepassword").valid())
        {
            companyuserchangepwd($('#cmpcoldpass').val(), $('#cmpcnewpass').val(),'CU');
        }
    });


    $('#compInfoContinue').click(function () {
        if ($("#compInfoContinueform").valid()) {
            companyUpdateInformation($('#CompEditInfoCompName').val(), $('#CompEditInfoFirstName').val(), $('#CompEditInfoLasttName').val(), $('#CompEditInfoCompPhone').val());
        }
    });



    $('#stuPassChange').click(function () {
        if ($("#studentchangepassword").valid()) {
            Studentchangepwd($('#stucoldpass').val(), $('#stucnewpass').val(), 'U');
        }
    });


    $('#stuInfoContinue').click(function () {
        if ($("#stuInfoForm").valid()) {
            var stuFirstName = $("#StuEditInfoFirstName").val();
            var stuLastName = $("#StuEditInfoLasttName").val();
            var stuUserName = $("#StuEditInfoUserName").val();
            var stuSchoolEmail = $("#StuEditInfoEmail").val();
            var stuSchoolName = $("#StuEditInfoSchool").val();
            var stuGradDate = $("#gradYearOption").val();
           
            studentUpdateInformation(stuUserName, stuSchoolEmail, stuSchoolName, stuFirstName, stuLastName, stuGradDate);
        }
    });

    // validation for student information updation
    $("#stuInfoForm").validate({
        rules: {
            StuEditInfoFirstName:
            {
                required: true,
                minlength: 5,
                maxlength: 50,
            },
            StuEditInfoLasttName:
            {
                required: true,
                minlength: 5,
                maxlength: 50,
            },
            StuEditInfoSchool:
            {
                minlength: 5,
                maxlength: 50
                
            }
        },
        messages: {
            StuEditInfoFirstName:
                {
                    required: "Please enter First Name",
                    minlength: "Your First Name must be at least 5 characters long",
                    maxlength: "Your First Name must be at less then 50 characters"
                },
            StuEditInfoLasttName: {
                required: "Please enter Last Name",
                minlength: "Your Last Name must be at least 5 characters long",
                maxlength: "Your Last Name must be at less then 50 characters"
            },
            StuEditInfoSchool:
                {
                   
                    minlength: "Your school name must be at least 5 characters long",
                    maxlength: "Your school name must be less than 50 character",
                    
                }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');

            error.addClass('error_outr');  // add a class to the wrapper
            //error.insertAfter(element);
            error.insertBefore(element)
            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });

    $("#stuPassChange").validate({
        rules: {
            stucoldpass:
            {
                required: true,
                minlength: 5
            },
            stucnewpass:
            {
                required: true,
                minlength: 5,
                maxlength: 50,
            },
            stucnewcpass:
            {
                required: true,
                minlength: 5,
                maxlength: 50,
                equalTo: "#stucnewpass"
            }
        },
        messages: {
            cmpcoldpass:
                {
                    required: "Please enter email address",
                    minlength: "Your password must be at least 5 characters long"
                },
            cmpcnewpass: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                maxlength: "Your password must be less than 50 character",
            },
            cmpcnewcpass:
                {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    maxlength: "Your password must be less than 50 character",
                    equalTo: "Password Mismatch"
                }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');

            error.addClass('error_outr');  // add a class to the wrapper
            //error.insertAfter(element);
            error.insertBefore(element)
            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });



    $("#compInfoContinueform").validate({
        rules: {
            CompEditInfoCompName:
            {
                required: true,
                minlength: 5
            },
            CompEditInfoFirstName:
            {
                required: true,
                minlength: 5
            },
            CompEditInfoLasttName:
           {
               required: true,
               minlength: 5
           },
            CompEditInfoCompPhone:
            {
                required: true,
                minlength: 10
            }
        },
        messages: {
            CompEditInfoCompName:
                {
                    required: "Please enter Company Name",
                    minlength: "company name must be at least 5 characters long"
                },
            CompEditInfoFirstName: {
                required: "Please provide your First Name",
                minlength: "First name must be at least 5 characters long"
            },
            CompEditInfoLasttName:
                {
                    required: "Please provide your Last Name",
                    minlength: "Last name must be at least 5 characters long"
                },
            CompEditInfoCompPhone:
               {
                   required: "Please provide company Phone",
                   minlength: "Company Phone must be 10 chracters long"
               }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');

            error.addClass('error_outr');  // add a class to the wrapper
            //error.insertAfter(element);
            error.insertBefore(element)
            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });

});

define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    var self = this;
    self.Error = ko.observable();
    return {
        email: ko.observable(),
        password: ko.observable(),
        login: function(){
            http.post(
                'https://afternoon-hollows-81019.herokuapp.com/auth_login', 
                {email:this.email,password:this.password},
                {format: 'json'}, 'jsoncallback').then(
                    function(response,b,c){
                        if(c.status==203){
                            if (response.error){
                                self.Error(response.error);
                            }
                        }else{
                            localStorage.setItem("token", response.token);
                            location.href = "/#Profile";
                        }
                    }
                );
        }
    };
});
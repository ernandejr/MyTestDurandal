define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router'], function (http, app, ko, router) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    var self = this;
    self.ErrorName = ko.observable();
    self.ErrorUserName = ko.observable();
    self.ErrorEmail = ko.observable();
    self.ErrorPassword = ko.observable();

    return {
        name: ko.observable(),
        username: ko.observable(),
        email: ko.observable(),
        password: ko.observable(),
        password_confirmation: ko.observable(),
        sign_up: function(){
            http.post(
                'https://afternoon-hollows-81019.herokuapp.com/sign_up', 
                {name: this.name, username: this.username, email:this.email,password:this.password,password_confirmation:this.password_confirmation},
                {format: 'json'}, 'jsoncallback').then(
                    function(response,b,c){
                        if(c.status==203){
                            if (response.error.name){
                                self.ErrorName(response.error.name[0]);
                            }
                            if (response.error.username){
                                self.ErrorUserName(response.error.username[0]);
                            }
                            if (response.error.email){
                                self.ErrorEmail(response.error.email[0]);
                            }
                            if (response.error.password){
                                if (response.error.password.length>1){
                                    var erros='';
                                    for (i = 0; i < response.error.password.length; i++) {
                                        if(response.error.password.length==i+1){
                                            erros += response.error.password[i];
                                        }else{
                                            erros += response.error.password[i] + " | ";
                                        }
                                    }
                                    self.ErrorPassword(erros);
                                }else{
                                    self.ErrorPassword(response.error.password[0]);
                                }
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
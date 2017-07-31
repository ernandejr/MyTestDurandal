define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    var self = this;
    self.Profile = ko.observable();
    self.Welcome = ko.observable();
    self.Name = ko.observable();
    self.Username = ko.observable();
    self.Email = ko.observable();
    self.Url = ko.observable();
    return {
        activate: function(){
            profile = http.get('https://afternoon-hollows-81019.herokuapp.com/profile', {} ,{"contentType": "application/json", "Authorization": "Bearer"+localStorage.getItem("token")}).then(
                    function(response){
                        if(response.user.active){
                            self.Profile("Bem vindo "+response.user.name);
                            self.Name("Nome: "+response.user.name);
                            self.Email("Email: "+response.user.email);
                            self.Username("Username: "+response.user.username);
                            self.Url("https://www.gravatar.com/avatar/"+response.user.activetoken+"?s=120&d=mm&r=g");
                        }else{
                            self.Welcome(true);
                            self.Name("Bem vindo "+response.user.name);
                        }
                    }
                );
        }
    };
});
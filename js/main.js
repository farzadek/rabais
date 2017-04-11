
var app = angular.module('RabaisEIPApp', ['ngRoute','ui.bootstrap','checklist-model']);


/* to disable caching */
app.config(['$httpProvider', function($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
/* ----------------------------------------------------- */
app.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when("/", {templateUrl: "partials/home1.html", controller: "homeCtrl"})
    // Pages
/*   .when("/store", {templateUrl: "partials/store.html", controller: "PageCtrl"})
    .when("/report", {templateUrl: "partials/report.html", controller: "reportCtrl"})
    .when("/indt", {templateUrl: "partials/indt.html", controller: "indtCtrl"})
    .when("/login", {templateUrl: "partials/login.html", controller: "LogCtrl"})
    .when("/register", {templateUrl: "partials/register.html", controller: "regCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "contactCtrl"}) 
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"}); */
}]);
//==========================================================================================
app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});
//==========================================================================================
app.controller('homeCtrl', function ($scope , $http) {

    $scope.currentUser = '';
    $scope.currentUserType = 0;
    $scope.signIn = 'Sign In';
    $scope.notLoggedIn = true;
    $scope.productOrderCount = 0;

    $scope.userFullInfo = true;

    $scope.currentUserClicked = function(){
        $scope.userFullInfo = !$scope.userFullInfo;

        $http.post("js/currentuserinfo.php").success(function(data){
            var found = false;
            angular.forEach(data, function(value, key){console.log(value.vpcode);
                if(!found)
                    if(value.vpcode == $scope.currentUserVpcode){
                        $scope.currentUserVpcode = value.vpcode;
                        $scope.currentUserName = value.name;
                        $scope.currentUserType = value.type; 
                        $scope.currentUserName = value.name;  
                        $scope.currentUserEmail = value.email;
                        $scope.currentUserActive = value.active;
                        $scope.currentUserPassword = value.password;   
                        $scope.currentUserAdress = value.adress;
                        $scope.currentUserCp = value.postcode;   
                        $scope.currentUsertel = value.tel;   
                        found = true;
                        $scope.userNotFoundMessageShow = false;
                        $scope.usernameLogin = '';
                        $scope.passwordLogin = '';
                        $scope.loginsForm.$setPristine;
                        $scope.loginsForm.$setUntouched;                        
                    }
                
            });
            if(!found){$scope.userNotFoundMessageShow = true;}
        })
      .error(function() {alert('System is not able to access user information!'); });


    }

    $scope.vedItemsMore = false;
    $scope.showVedette = function(){
        $scope.vedItemsMore = !$scope.vedItemsMore; 
    }

    $scope.primItemsMore = false;
    $scope.showPrim = function(){
        $scope.primItemsMore = !$scope.primItemsMore; 
    }

    $scope.loginsForm = true;
    $scope.switch1 = false;
    $scope.switch2 = false;
    $scope.switch3 = false;
    $scope.inscriptType = 4; 

    $scope.registerClicked = function(){ 
        $scope.switch1 = true;
        $scope.switch2 = false;
        $scope.switch3 = false;
        $scope.loginsForm = false;
        $scope.inscriptType = 1;    
    }
    $scope.registerMembreClicked = function(){ 
        $scope.switch1 = false;
        $scope.switch2 = true;
        $scope.switch3 = false;
        $scope.loginsForm = false;
        $scope.inscriptType = 2;    
    }
    $scope.registerDetailClicked = function(){ 
        $scope.switch1 = false;
        $scope.switch2 = false;
        $scope.switch3 = true;
        $scope.loginsForm = false;
        $scope.inscriptType = 3;    
    }

    $scope.signInClicked = function(){ 
        $scope.switch1 = false;
        $scope.switch2 = false;
        $scope.switch3 = false;
        $scope.loginsForm = true;
        $scope.inscriptType = 4;    
    }

    $scope.logoutClicked = function(){ 
        $scope.currentUserType = 0; //type
        $scope.currentUserName = ''; //name 
        $scope.currentUserVpcode = '';
        $scope.currentUserEmail = '';
        $scope.currentUserActive = '';
        $scope.currentUserImage = '';
        $scope.currentUserUsername = '';
        $scope.currentUserPassword = '';     
    }

// ------------------------------------------------------------------------- 1
    $scope.passMatch = false;
    $scope.passInscriptCheck = function( p1 , p2){
        test = false;
        if(p1.length == p2.length){;
            var test = true;
            for( i=0; i<p1.length; i++ ){
                if( p1[i] != p2[i] ){
                    test = false; 
                    i = p1.length+1;break;
                }
            }        }
        $scope.passMatch = test;
    }
 

    $scope.nameInscript ='';
    $scope.familInscript ='';
    $scope.telInscript = ''; 
    $scope.emailInscript = ''; 
    $scope.usernameInscript = ''; 
    $scope.pass1Inscript = '';
    $scope.pass2Inscript = '';

    $scope.submitGratuitForm = function(isValid){ 

    if(isValid){
      $http({
        url: "js/inscript.php",
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({
          name:$scope.nameInscript, 
          famil:$scope.familInscript, 
          tel:$scope.telInscript, 
          email:$scope.emailInscript, 
          username:$scope.usernameInscript, 
          password:$scope.pass1Inscript,
          type:'4'
        })
      })
      .success(function(data, status, headers, config) { alert($scope.nameInscript+' '+$scope.familInscript);
        $scope.currentUserName = $scope.nameInscript+' '+$scope.familInscript;
        $scope.currentUserType = 4; 
        $scope.currentUserActive = 1;

        $scope.nameInscript ='';
        $scope.familInscript ='';
        $scope.emailInscript = ''; 
        $scope.usernameInscript = ''; 
        $scope.telInscript = ''; 
        $scope.pass1Inscript = '';
        $scope.pass2Inscript = '';
        $scope.gratuitMemberForm.$setPristine();
        $scope.gratuitMemberForm.$setUntouched();

       })
      .error(function(data, status, headers, config) {alert('Something wrong, system is not able to save data!'); });
    }

    }//submit
// -------------------------------------------------------------------------


// ------------------------------------------------------------------------- 2
    $scope.passMemberMatch = false;
    $scope.passMemberInscriptCheck = function( p1 , p2){
        if(p1.length == p2.length){
            var i = 0; 
            var test = true;
            for( i=0; i<p1.length; i++ ){
                if( p1[i] != $scope.p2[i] ){
                test = false; 
                i = p1.length+1;
                }
            }
        }
        $scope.passMemberMatch = test;
    }

    $scope.nameMemberInscript ='';
    $scope.familMemberInscript ='';
    $scope.telMemberInscript = ''; 
    $scope.emailMemberInscript = ''; 
    $scope.usernameMemberInscript = ''; 
    $scope.pass1MemberInscript = '';
    $scope.pass2MemberInscript = '';

    $scope.submitMemberForm = function(isValid){ 

    if(isValid){
      $http({
        url: "js/inscript.php",
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({
          name:$scope.nameMemberInscript, 
          famil:$scope.familMemberInscript, 
          tel:$scope.telMemberInscript, 
          email:$scope.emailMemberInscript, 
          username:$scope.usernameMemberInscript, 
          password:$scope.pass1MemberInscript,
          type:'5'
        })
      })
      .success(function(data, status, headers, config) { 
        $scope.currentUser = $scope.nameMemberInscrip+' '+$scope.familMemberInscript;
        $scope.currentUserType = 5; 

        $scope.nameMemberInscript ='';
        $scope.familMemberInscript ='';
        $scope.emailMemberInscript = ''; 
        $scope.usernameMemberInscript = ''; 
        $scope.telMemberInscript = ''; 
        $scope.pass1MemberInscript = '';
        $scope.pass2MemberInscript = '';
        $scope.memberForm.$setPristine();
        $scope.memberForm.$setUntouched();

        alert('Les information sauvegardent');
       })
      .error(function(data, status, headers, config) {alert('Something wrong, system is not able to save data!'); });
    }

    }//submit
// -------------------------------------------------------------------------


// ------------------------------------------------------------------------- 3
    $scope.passDetailMatch = false;
    $scope.passDetailInscriptCheck = function( p1 , p2){
        if(p1.length == p2.length){
            var i = 0; 
            var test = true;
            for( i=0; i<p1.length; i++ ){
                if( p1[i] != $scope.p2[i] ){
                test = false; 
                i = p1.length+1;
                }
            }
        }
        $scope.passDetailMatch = test;
    }

    $scope.nameDetailInscript ='';
    $scope.companynameDetailInscript ='';
    $scope.telDetailInscript = ''; 
    $scope.emailDetailInscript = ''; 
    $scope.logoDetailInscript = ''; 
    $scope.usernameDetailInscript = ''; 
    $scope.pass1DetailInscript = '';
    $scope.pass2DetailInscript = '';

    $scope.submitDetailForm = function(isValid){ 

    if(isValid){
      $http({
        url: "js/inscript.php",
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({
          name: $scope.nameDetailInscript, 
          famil: '',
          tel: $scope.telDetailInscript,
          logo: $scope.logoDetailInscript, 
          email: $scope.emailDetailInscript, 
          username: $scope.usernameDetailInscript, 
          password: $scope.pass1DetailInscript,
          type:'6'
        })
      })
      .success(function(data, status, headers, config) { 
        $scope.currentUser = $scope.nameDetailInscript;
        $scope.currentUserType = 6; 

        $scope.nameDetailInscript ='';
        $scope.telDetailInscript = ''; 
        $scope.emailDetailInscript = ''; 
        $scope.usernameDetailInscript = ''; 
        $scope.logoDetailInscript = ''; 
        $scope.pass1DetailInscript = '';
        $scope.pass2DetailInscript = '';
        $scope.detailForm.$setPristine();
        $scope.detailForm.$setUntouched();

        alert('Les information sauvegardent');
       })
      .error(function(data, status, headers, config) {alert('Something wrong, system is not able to save data!'); });
    }

    }
// ------------------------------------------------------------------------- LOGIN

//    $scope.loginPassMatch = false;
    $scope.userNotFoundMessageShow = false;
    $scope.showStore = true;
    $scope.totalPrice = 0;
    $scope.submitLoginForm = function(isValid){

$scope.addMore = function(obj, $event){
//    console.log(event.currentTarget);
}
    $scope.showSearchBar = false;
        if(isValid){
            $http.get("js/userlist.php").success(function(data){
                var found = false;
                angular.forEach(data, function(value, key){
//                    if(value.username == $scope.usernameLogin && value.password == $scope.passwordLogin){ 
                        found = true;
                        $scope.showStore = false;
                        $scope.signIn = value.name_user;
                        $scope.notLoggedIn = false;
                        $scope.showSearchBar = true;
                        $scope.usernameLogin = '';
                        $scope.passwordLogin = '';
                        $http.get("partials/products.json").then(function(response) {
                            $scope.products = response.data.products;
                        
                        /* ----- pagination ----- */
                            $scope.currentPage = 1;
                            $scope.totalItems = $scope.products.length;
                            $scope.entryLimit = 8; 
                            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                        });
                        /* --------------------- */
//                    }
                });                 
                if(!found){$scope.userNotFoundMessageShow = true;}
            })
            .error(function() {alert('System is not able to access user information!'); });
        }

    }  

    $scope.logedOut = function(){
        $scope.signIn = '';
        $scope.showStore = true;
        $scope.notLoggedIn = true;
    }

    $scope.orderChanged = function(){
        var total=0;
        for(var i=0;i<$scope.products.length;i++){
            var product=$scope.products[i];
            total+=product.price*product.no;
        }
        $scope.totalPrice=total;
    }
    $scope.posClicked = function(obj){
        obj.no++;
        $scope.orderChanged();
    }
    $scope.negClicked = function(obj){
        if(obj.no>0){
            obj.no--;
            $scope.orderChanged();
        }
    }

    $scope.orderFinish = function(){
        $scope.order=[];
        for(i=0;i<$scope.products.length;i++){
            if($scope.products[i].no>0){
                $scope.order.push($scope.products[i]);
            }
        }
    }

    $scope.orderConfirmClicked = function(){
        bought='';
        for(i=0;i<$scope.order.length;i++){
            bought+=$scope.order[i].name+' - '+$scope.order[i].no+'X'+$scope.order[i].price.toFixed(2)+'$\n';
        }
        bought += '________________________________________________\n';
        bought += 'TOTAL: '+$scope.totalPrice.toFixed(2)+ '$\n';
        bought += 'TAX: '+($scope.totalPrice*15/100).toFixed(2)+ '$\n';
        bought += 'PAYABLE: '+($scope.totalPrice*115/100).toFixed(2)+ '$\n';

        $.post("js/saveorder.php",
            {
              name: $scope.usernameLogin,
              order: bought
            },
            function(data,status){
                console.log("data: "+data+" Status: " + status);
        });
        $scope.product.no = 0;
    }

    $scope.sortItems = [
        {id:1, label:'Titre (A-Z)', subItem:{name:'name'}},
        {id:2, label:'Titre (Z-A)', subItem:{name:'-name'}},
        {id:3, label:'Prix (0-9)', subItem:{name:'price'}},
        {id:4, label:'Prix (9-0)', subItem:{name:'-price'}},
        {id:5, label:'Category', subItem:{name:'cat'}}
    ];
    $scope.opt1 = $scope.sortItems[0].subItem.name;
    $scope.selected = $scope.sortItems[0];
    $scope.sortOptionChanged = function(){
        $scope.opt1 = $scope.selected.subItem.name;
    }

/* ------------------ filterByCategory ------------ */
/* ------------------------------------------------ */

    $scope.inscriptTypeTitle = 'Login';
    $scope.inscriptType = 4;
    $scope.switch1 = false;
    $scope.switch2 = false;
    $scope.switch3 = false;
    $scope.loginsForm = true;
    $scope.lInscriptTypeClicked = function(){
        if($scope.inscriptType>1)
            {$scope.inscriptType--;}
        else
            {$scope.inscriptType=4;}

        if($scope.inscriptType == 1)
            {$scope.inscriptTypeTitle = 'Gratuit';$scope.switch1 = true;$scope.switch2 = false;$scope.switch3 = false;$scope.loginsForm = false;}
            else if($scope.inscriptType == 2)
                    {$scope.inscriptTypeTitle = 'Membre';$scope.switch1 = false;$scope.switch2 = true;$scope.switch3 = false;$scope.loginsForm = false;}
                else if($scope.inscriptType == 3)
                        {$scope.inscriptTypeTitle = 'Détaillant participant';$scope.switch1 = false;$scope.switch2 = false;$scope.switch3 = true;$scope.loginsForm = false;}
                    else if($scope.inscriptType == 4)
                            {$scope.inscriptTypeTitle = 'Login';$scope.switch1 = false;$scope.switch2 = false;$scope.switch3 = false;$scope.loginsForm = true;}
    }

    $scope.rInscriptTypeClicked = function(){
        if($scope.inscriptType<4)
            {$scope.inscriptType++;}else{$scope.inscriptType=1;}

        if($scope.inscriptType == 1)
            {$scope.inscriptTypeTitle = 'Gratuit';$scope.switch1 = true;$scope.switch2 = false;$scope.switch3 = false;$scope.loginsForm = false;}
        else if($scope.inscriptType == 2)
            {$scope.inscriptTypeTitle = 'Membre';$scope.switch1 = false;$scope.switch2 = true;$scope.switch3 = false;$scope.loginsForm = false;}
            else if($scope.inscriptType == 3)
                {$scope.inscriptTypeTitle = 'DÃ©taillant participant';$scope.switch1 = false;$scope.switch2 = false;$scope.switch3 = true;$scope.loginsForm = false;}
                else if($scope.inscriptType == 4)
                    {$scope.inscriptTypeTitle = 'Login';$scope.switch1 = false;$scope.switch2 = false;$scope.switch3 = false;$scope.loginsForm = true;}
    }




});


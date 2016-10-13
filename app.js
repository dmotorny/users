var usersList = `<div class="user_card_form">
        <form class="form-horizontal" id="new_user_form" ng-submit="$ctrl.addUser()">
          <div class="form-group">
            <label class="control-label" for="full_name">Full Name</label>
            <input id="full_name" class="form-control" type="text" ng-model="$ctrl.user.fullName" required>
          </div>
          <div class="form-group">
            <label>Avatar</label>
            <input class="form-control" type="file" ng-model="$ctrl.user.avatarUrl">
          </div>
          <div class="form-group">
            <label>Birthdate</label>
            <input class="form-control" type="text" ng-model="$ctrl.user.birthdate">
          </div>
          <div class="form-group">
            <label>Gender</label>
            <div id="form_radio">
              <div><input id="male_radio" name="sex-radio" value="M" type="radio" ng-model="$ctrl.user.gender"><label for="male_radio">male</label></div>
              <div><input id="female_radio" name="sex-radio" value="F" type="radio" ng-model="$ctrl.user.gender"><label for="female_radio">female</label></div>
            </div>
          </div>
          <div class="form-group">
            <label>Address</label>
            <input class="form-control" type="text" ng-model="$ctrl.user.address"><br />
          </div>
          <div class="form-group">
            <label>E-mail</label>
            <input class="form-control" type="email" ng-model="$ctrl.user.email" required><br />
          </div>
          <div class="form_button form-group">
            <div><button class="btn btn-primary">Save</button></div>
          </div>
          <div class="clear"></div>
        </form>
      </div>
      <div class="one_user_card" ng-repeat="user in $ctrl.users">
        <user-item item="user" remove="$ctrl.removeUser(user)"></user-item>
        <!--<img src="{{user.avatarUrl}}">-->
        <img src="https://randomuser.me/api/portraits/thumb/men/57.jpg">
        <h3>{{user.fullName}}</h3>
        <div class="user_data_block">
          <p><span class="left_value">Birthdate1</span><span class="right_value">{{user.birthdate}}</span></p>
          <p><span class="left_value">Gender</span><span class="right_value">{{user.gender}}</span></p>
          <p><span class="left_value">Address</span><span class="right_value">{{user.address}}</span></p>
          <p><span class="left_value">E-mail</span><span class="right_value"><a hrseref="mailto:{{user.email}}">{{user.email}}</a></span></p>
        </div>
      </div>`; 
      
    var userItem = `<div class="view">
          <button class="destroy"  ng-click="$ctrl.remove({user:$ctrl.user})"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
        </div>`;
    
    angular.module('userList', [])
    .service('Logic', function($http) {
      this.getAll = () => {
        return $http.get('http://test-api.javascript.ru/v1/dmotorny1/users')
          .then(response => response.data)
      }
      this.add = (user) => {  
        return $http.post('http://test-api.javascript.ru/v1/dmotorny1/users', user)
          .then(response => response.data)
      }
      this.remove = (user) => {
        return $http.delete('http://test-api.javascript.ru/v1/dmotorny1/users/' + user._id);
      }
    })
    .component('card', {
      template: usersList,
      controller: function(Logic, $http) {
        Logic.getAll().then(users => this.users = users);
        
        this.user = {
          fullName: '',
          avatarUrl: '',
          birthdate: '',
          gender: '',
          address: '',
          email: ''
        };
        
        this.addUser = Logic.addUser;
        
        this.addUser = () => {
          if (this.user.fullName) {
            Logic.add(this.user).then((user) => {
              var testos = new Date(user.birthdate);
              console.log(testos);
              this.users.unshift(user);
              this.user.fullName = '';
              this.user.avatarUrl = '';
              this.user.birthdate = '';
              this.user.gender = '';
              this.user.address = '';
              this.user.email = '';
            });
          }
        };
        
        this.removeUser = (user) => {
          if (confirm('Are you sure?')) {
            Logic.remove(user).then(() => {
              this.users.splice(this.users.indexOf(user), 1);
            })
          } else return false;
        };
      }
    })
    .component('userItem', {  
        bindings: {
          user: '<item',
          remove: '&'
        },
        template: userItem,
        controller: function(Logic) {
          this.true = true;
        }
    });

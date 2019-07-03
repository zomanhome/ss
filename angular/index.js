let model = {
  list: [
    { name: 'To wash my cat', done: true },
    { name: 'To do homework', done: false },
    { name: 'To eat vegetables', done: true },
    { name: 'To buy milk ', done: false }
  ]
};
let TodoListApp = angular.module('TodoListApp', []);

TodoListApp.controller('TodoListCtrl', $scope => {
  $scope.data = model;

  $scope.addTodo = () => {
    if ($scope.text && $scope.text.length !== 0) {
      let same = false;
      $scope.data.list.forEach(el => {
        if (el.name === $scope.text) same = true;
      });
      if (!same) {
        $scope.data.list.push({ name: $scope.text, done: false });
        $scope.text = '';
      } else {
        console.log('You can not add the same doing!');
      }
    }
  };

  $scope.deleteTodo = el => {
    $scope.data.list = $scope.data.list.filter(li => el.name !== li.name);
  };

  $scope.setStyle = el =>
    el ? 'color: green' : 'color: red; font-weight: bold';

  $scope.showText = el => (el ? 'yes' : 'no');
});

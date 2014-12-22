"use strict";
var app = app || {};

app.controller('StudentPage', function ($scope) {
    var student = {
        name: 'Goshko',
        grade: 5.65,
        school: 'Software University',
        teacher: 'Pazi Boje Daskalov',
        photo: 'http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png'
    };

    $scope.student = student;
});

app.controller('BindImageSourceToTextBox', function ($scope) {

});

app.controller('Tiger', function ($scope) {
    var tiger = {
        name: 'Pesho',
        born: 'Asia',
        birthDate: '2006',
        live: 'Sofia Zoo'
    };

    var imgUrl = 'http://tigerday.org/wp-content/uploads/2013/04/tiger.jpg';

    var wrapperStyle = {
        width: '50%',
        background: '#C9C9C9',
        padding: '20px',
        fontSize: '18px',
        fontFamily: 'Calibri, Latha, Cambria, Arial, sans-serif'
    };

    var bold = {
        fontWeight: 'bold'
    };

    var block = {
        width: '48%',
        display: 'inline-block',
        verticalAlign: 'top',
        border: 'none',
        color: 'rgb(43,61,79)',
        fontWeight: 'bolder',
        fontSize: '22px'
    };

    $scope.tiger = tiger;
    $scope.imgUrl = imgUrl;
    $scope.wrapperStyle = wrapperStyle;
    $scope.bold = bold;
    $scope.block = block;
});













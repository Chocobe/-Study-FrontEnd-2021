# 04 callback

[🐫 돌아가기](https://github.com/Chocobe/-Study-FrontEnd-2021/tree/master/01-Javascript%20%ED%95%B5%EC%8B%AC%20%EA%B0%9C%EB%85%90%20%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0%20(2021.04.11%20%EC%8B%9C%EC%9E%91))

<br/>

``callback`` 함수는, 호출해서 돌려줄 함수를 말합니다.

``callback`` 함수를 호출하는 함수(or 메서드)에게 ``제어권을 위임`` 하는 방식 입니다.

즉, ``callback 함수`` 내부의 ``실행시점, 인자, this`` 에 대한 제어권을 ``callback 함수`` 를 ``호출하는 함수`` 에게 위임 합니다.

<br/>

제어권에는 다음과 같은 종류가 있습니다.
* 실행시점
* 인자
* this


<br/><br/>


## 1. 실행시점

callback 함수를 실행시키는 ``실행시점`` 에 대한 제어권을 위임하는 방식 입니다.

``setInterval`` : 주기적으로 callback 함수 호출

```javascript
  setInterval(function() {
    console.log("1초마다 실행되는 callback 함수 입니다");
  }, 1000);
```


<br/><br/>


## 2. 인자

callback 함수가 가져야 하는 ``인자 규칙`` 에 대한 제어권을 위임하는 방식 입니다.

배열의 ``forEach`` 메서드를 사용하려면, ``forEach`` 에서 요구하는 ``인자 규칙`` 을 따라야 합니다.

``forEach``: 배열의 각 요소를 한번씩 순서대로 실행 시킵니다.

```javascript
const arr = [1, 2, 3, 4, 5];
const otherArr = [10, 20, 30, 40, 50];
const result = [];


arr.forEach(function(value, index, originArr) {
  result[index].push(index, value, this[index]);
}, otherArr);

console.log(result); // [[0, 1, 10], [1, 2, 20], [2, 3, 30], [3, 4, 40], [4, 5, 50]];
```


<br/><br/>


## 3. this

callback 함수 내부의 ``this`` 객체가 무엇으로 사용할 것인가에 대한 제어권은 위임하는 방식 입니다.

``addEventListener`` : HTMLElement 에 ``Event`` 별 callback 함수를 지정 합니다.

```javascript
document.querySelector("button").addEventListener("click", function(x) {
  console.log(this); // button Element 로 this가 경정 됩니다.
  console.log(x); // MouseEvent
});
```


<br/><br/>


## 4. 정리

1. 함수(A)의 인자로 callback함수(B)를 전달하면, 함수(A)가 ``callback함수(B)`` 의 제어권을 갖게 됩니다.

2. 함수(A)에 ``미리 정해놓은 정의``에 따라 callback함수(B)를 호출 합니다.

* 미리 정해놓은 정의
  * 어떤 ``시점``에 callback 을 호출할 것인가,
  * ``인자`` 에는 어떤 값들을 지정할 것인가,
  * ``this`` 는 어떤 객체를 binding 할 것인가, (bind() 메서드를 별도로 사용하지 않는 경우에 한함)


<br><br/>


## 5. 주의할 점

callback 함수는 메서드가 아니라 ``함수`` 입니다.

callback을 인자로 받는 함수에서, thisBinding 을 하지 않는 한, ``this === window`` 입니다.

따라서, callback 함수에서 사용할 ``this`` 를 직접 지정해 주려면, ``bind() 메서드`` 를 사용하여 ``this``를 직접 지정할 수 있습니다.

<br>

``forEach(callback, thisArg)`` 와 같이, ``thisArg`` 를 인자로 넘길 수 있는 경우에는, ``thisArg`` 를 통해서 ``this`` 를 지정할 수 있습니다.

```javascript
const arr = [1, 2, 3, 4, 5];

const obj = {
  values: [10, 20, 30],
  logValues: function (value, index) {
    if(this.values) {
      console.log(this.values, value, index);
    } else {
      console.log(this, value, index);
    }
  }
}

// 메서드로 호출 시, this === obj
obj.logValues(100, 200); // [10, 20, 30], 100, 200

// callback 함수로서 호출 시, this === window
arr.forEach(obj.logValues); 
// window, 1, 0
// window, 2, 1
// window, 3, 2
// window, 4, 3
// window, 5, 4

// callback 함수로서 호출 하면서, this를 지정
arr.forEach(obj.logvalues, obj);
// [10, 20, 30], 1, 0
// [10, 20, 30], 2, 1
// [10, 20, 30], 3, 2
// [10, 20, 30], 4, 3
// [10, 20, 30], 5, 4
```
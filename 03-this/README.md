# 03 this

[🐫 돌아가기](https://github.com/Chocobe/-Study-Javascript-ES5-2021)

<br/>

``this`` 는 ``실행 컨텍스트`` 가 활성화 되는 순간, 바인딩 됩니다.

``this`` 가 위치하는 곳 역시 ``Execute Context`` 입니다.

``실행 컨텍스트`` 는 함수를 호출할 때마다 새로운 (하위) ``실행 컨텍스트`` 가 활성화 되므로, ``함수를 호출 할때`` => ``this binding`` 이 됩니다.

<br/>

```bash
  Execution Context ┬─ VariableEnvironment
                    │     ├─ environmentRecord (LexicalEnvironment 의 최초 스넵샷)
                    │     │     : 현재 문맥의 식별자 정보
                    │     └─ outerEnvironmentReference (LexicalEnvironment 의 최초 스넵샷)
                    │           : 외부 문맥의 식별자 정보
                    │
                    ├─ LexicalEnvironment
                    │     ├─ environmentRecord (현재 시점에서 변형된 상태)
                    │     │     : 현재 문맥의 식별자 정보
                    │     │     : === Hoisting
                    │     └─ outerEnvironmentReference (현재 시점에 변형된 상태값)
                    │           : 자신을 호출한 상위 Call Stack 의 참조 주소값
                    │           : === 외부 식별자
                    │           : === Scope Chain
                    │
                    └─ thisBindling
                          : 실행 컨텍스트가 열리는 순간 ``this`` 를 바인딩 합니다.
```

<br/>

``this`` 는 함수를 호출하는 방식에 따라 ``Binding 이 달라집니다.``

``this`` 가 달라지는 상황은 다음과 같습니다.
* 전역공간에서 호출 시.
* 함수 호출 시.
* 메서드 호출시.
* callback 호출시.
* 생성자함수 호출시.

<br/>

* 함수와 메서드 차이
  * 특정 객체의 내부에 존재하는 함수는 메서드가 됩니다. (``this === 상위객체``)
  * 그 외, 단독으로 존재하는 함수는 함수 입니다. (``this === window 객체``)
  ```javascript
  function a() {
    // 함수 a
  }

  var b = function() {
    // 함수 b
  }

  var c = {
    d: function() {
      // c 의 메서드 d
    }
  }

  // 함수 a 호출
  a();

  // 함수 b 호출
  b();

  // c 의 메서드 d 호출
  c.d();
  ```


<br/><br/>


## 1. 전역공간에서의 ``this``

* 브라우저 환경 전역공간에서 호출 시 
  * ``this === window 객체``

* NodeJS 환경 전역공간에서 호출 시 
  * ``this === global 객체``


<br/><br/>


## 2. 함수 호출 시, 함수 내부에서 ``this``
* 브라우저 환경 
  * ``this === window 객체``

* NodeJS 
  * ``this === global 객체``

* Javascript 에서 함수호출 시, ``this`` 는 ``무조건 window`` 객체를 가리킵니다.
  * 함수 내에서 다른 함수를 호출할 경우 역시, ``무조건 window`` 객체를 가리킵니다.
  ```javascript
    function a() {
      console.log(this); // window 객체
    }

    function b() {

      function c() {
        console.log(this); 
      }

      c(); // window 객체
    }

    b();
  ```


<br/><br/>


## 3. 메서드로 호출시, 메서드 내부에서 ``this
  * 메서드를 가지고 있는 ``바로 상위 객체`` 가 ``this`` 가 됩니다.
  ```javascript
    const a = {
      b: function() {
        console.log(this);
      }
    }

    a.b(); // this === a 객체
  ```
  * 만약, 메서드 내부에서 함수를 호출 한다면, 그 함수 내부의 ``this`` 는 ``window 객체`` 가 됩니다.
  ```javascript
    var a = 10;

    var obj = {
      a: 20;
      b: function() {
        console.log(this.a); // 20 출력 (obj.a)

        function c() {
          console.log(this.a); // 10 출력 (window.a)
        }
        c();
      }
    }
    obj.b();
  ```


<br/><br/>


## 4.  명시적인 ``this 바인딩`` 메서드 살펴보기

함수의 ``this`` 를 직접 지정할 수 있는 메서드가 있습니다.
* ``func.call(thisArg[, arg1[, arg2[, ...]]])``
  * 첫번째 인자로 ``this`` 객체를 넘겨주고, 두번째 인자부터는 함수의 원래 인자들을 차례로 전달하고 실행 시킵니다. (``즉시 호출``)
* ``func.apply(thisArg[, argsArray])``
  * 첫번째 인자로 ``this`` 객체를 넘겨주고, 두번째 인자는 함수의 원래 인자들을 배열로 전달하고 실행 시킵니다. (``즉시 호출``)
* ``func.bind(thisArg[, arg1[, arg2[, ...]]])``
  * 첫번째 인자로 ``this`` 객체를 넘겨주고, 두번째 인자는 함수의 원래 인자들을 선택적으로 전달하고, 남은 인자를 받는 함수를 새로 생성만 합니다. (``새로운 함수 생성``)

<br/>

함수의 ``call(), apply(), bind()`` 메서드를 사용하게 되면, 첫번째 인자로 넘긴 객체가 ``this`` 로 변경 됩니다.


<br/><br/>


## 5. callback 호출 시, callback 내부의 ``this``

위에서 보았던 함수와 메서드의 성격과 동일 합니다.

```javascript
var a = function() {
  console.log(this);
}

var b = {
  b1: 123,
  b2: function() {
    console.log(this);
  }
  b3: function(callback) {
    callback();
  }
}

// 함수 호출
// * this === window 객체
a(); 

// call() 메서드로 this 지정
// this === b 객체
a.call(b) 

// apply() 메서드로 this 지정
// this === b 객체
a.apply(b) 

// bind() 메서드로 this 지정
// this === b 객체
var aa = a.bind(b);
aa(); 

// 메서드 호출
// this === b 객체
b.b2(); 

// 메서드 호출 -> 메서드 내부에서 함수 호출 -> 호출된 함수 내부에서 this 접근
// this === window 객체
b.b3(a);

// 메서드 호출 -> 메서드 내부에서 함수 호출 -> bind() 로 this를 지정한 함수 내부에서 this 접근
// this === b 객체
b.b3(aa);
```

<br/>

window 객체의 메서드인 ``setTimeout(), setInterval()`` 등, callback 함수를 받는 경우에도 ``this`` 를 지정할 수 있습니다.
```javascript
var myCallback = function() {
  console.log(this);
};

var b = {
  b1: 123,
  b2: function() {
    //
  },
};

// myCallback() 의 this 를 b로 지정하여 전달시, callback 함수의 내부에서 this 는 지정했던 객체로 사용됩니다.
setTimeout(myCallback.bind(b));

// 위와 동일한 방식을, 익명함수로 표현하면 다음고 같습니다.
setTimeout(function() {
  console.log(this);
}.bind(b));
```


<br/><br/>


## 6. 생성자함수 호출시, 생성자함수 내의 ``this``

생성자 함수는 Property를 초기화 할때, ``this.변수명 = 값;`` 형식으로 초기화 합니다.

생성자 함수 자체로만 봤을때 ``this.변수명`` 은, 함수에서 접근한 ``this`` 와 동일한 ``window`` 객체가 됩니다.

하지만, ``new`` 키워드를 사용하여, 생성자 함수를 호출하면, ``this`` 는 ``생성한 객체 - 인스턴스`` 를 가리키게 됩니다.

```javascript
function Person(name, age) {
  // 생성자 함수지만, 일반 함수와 동일한 구조를 갖습니다.
  // new 키워드로 호출하지 않는 한, 일반 함수 입니다.
  // 함수 내에서 접근한 ``this`` 는 ``window`` 객체 입니다.
  this.name = name;
  this.age = age;
}

// 다음가 같이 new 키워드로 Person() 함수를 생성자 함수로서 사용하면 일반 함수에서의 ``this``와 달라집니다.
// new 키워드가 붙게 되면, 호출한 생성자 함수 내부의 ``this`` 는, 생성된 객체를 가리킵니다.
// 따라서, 생성자 함수를 정의한 시점의 ``this`` 는 ``window`` 객체였지만,
// new 키워드를 사용하므로써, 생성자 함수 내부의 ``this`` 는 생성된 객체 자신이 됩니다.
var kim = new Person("kim", 35);

// 생성자 함수 내부의 ``this`` 가, 객체(인스턴스) 자신이 되었으므로,
// 다음과 같은 형식의 데이터가 됩니다.
var kim = {
  name: "kim",
  age: 35,
};
```
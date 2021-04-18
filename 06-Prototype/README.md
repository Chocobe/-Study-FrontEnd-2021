# 06 Prototype

[🐫 돌아가기](https://github.com/Chocobe/-Study-FrontEnd-2021/tree/master/01-Javascript%20%ED%95%B5%EC%8B%AC%20%EA%B0%9C%EB%85%90%20%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0%20(2021.04.11%20%EC%8B%9C%EC%9E%91))

<br/>

## 1. 생성자 함수 ``constructor()``

Javascript 의 ``new`` 키워드를 사용한 객체 생성은 ``constructor()`` 라는 ``생성자`` 메서드가 만들어 반환하는 새로운 객체 입니다.

생성된 객체에서 바라볼 때, ``constructor()`` 의 경로는 ``객체.__proto__.constructor()`` 지만, ``__proto__`` 경로를 생략하고 접근하여도 정상 접근이 가능합니다.

객체의 특정 프로퍼티에 접근했을 때, 자기 자신에게 없다면, ``Prototype`` 의 참조객체에서 찾기 때문에, ``__proto__`` 경로를 생략해도, 자신의 ``constructor`` 에 접근할 수 있는 것입니다. (super 객체 접근 방식)

``constructor`` 뿐만 아니라, ``Prototype`` 에 정의한 ``메서드`` , ``변수`` 모두 해당 됩니다.

<br/>

생성자 함수를 사용하여 객체를 생성하면, 다음과 같습니다.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getOld = function() {
  console.log(this.age);
}

const kim = new Person("kim", 35);
```

<br/>

``Person(name, age)`` 함수 안에서의 ``this`` 는 ``new`` 키워드로 사용하게 되어, ``this === 새로 생성될 객체`` 가 됩니다.

그리고 생성자 함수로 사용한 ``Person(name, age)`` 함수는 ``constructor()`` 함수가 됩니다.

``kim`` 객체를 도식화 하면 다음과 같습니다.

```bash
kim
  ├── name
  ├── age
  └── __proto__
        ├── constructor()
        │     === function Person(name, age)
        │
        └── __proto__
              ├── Object()
```

<br/>

위 도식에서의 ``constructor()`` 는 ``__proto__`` 객체 안에 있습니다.

하지만, ``constructor()`` 에 접근할 때는 ``__proto__`` 를 생략 할 수 있으므로, 다음과 같이 접근할 수도 있습니다.

```javascript
kim.constructor()
=== kim.__proto__.constructor()
```


<br/><br/>


## 2. ``prototype`` 에 메서드 등록

생성자 함수의 ``__proto__`` 프로퍼티를 통해 ``prototype`` 에 접근할 수 있습니다.

이 ``prototype`` 의 프로퍼티로 메서드를 추가할 수 있습니다.

```javascript
function Persion(name, age) {
  this.name = name;
  this.age = age;
}

// Person 생성자 함수의 Prototype 에 "getOld()`` 메서드 표현식 추가
Person.__proto__.getOld = function() {
  return this.age;
}
```

<br>

위와 같이 ``Prototype`` 에 추가된 프로퍼티는, ``동일한 생성자`` 를 사용하여 생성한 객체들에게는 ``모두 적용`` 됩니다.

이유는 동일한 ``생성자 함수 (constructor())`` 를 참조하고 있기 때문입니다.

<br/>

``Prototype`` 에 ``메서드 프로퍼티`` 를 추가하여 사용할 경우, 주의할 점이 있습니다.

1. ``Prototype`` 에 추가한 ``메서드 프로퍼티`` 의 내부에서 사용하는 ``this`` 는 호출자에 따라 ``객체가 달라집니다`` (Execute Context)

    ```javascript
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }

      Person.__proto__.getOld = function() {
        return this.age;
      }

      // ``new`` 키워드에 의해, age 는 kim객체의 프로퍼티
      const kim = new Person("kim", 35);

      // 실행 컨텍스트가 kim 객체이므로, this === kim객체
      console.log(kim.getOld()); // 35 출력

      // 실행 컨텍스트가 kim.__proto__ 객체이므로, this === kim.__proto__
      // kim.__proto__ 객체에는 ``age 프로퍼티가 없음``
      console.log(kim.__proto__.getOld()) // undefined 출력
    ```

2. ``함수 표현식`` 이므로, ``Hoisting`` 이 ``적용되지 않습니다``

    ```javascript
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }

      const kim = new Person("kim", 35);

      console.log(kim.getOld()); // 에러발생 위치

      Person.__proto__.getOld = function() {
        return this.age;
      }

      console.log(kim.getOld()); // 정상동작 위치
    ```
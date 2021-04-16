# 05 Closure

``Closure`` 란, 어떤 함수가 선언된 시점의 ``Lexical Environment`` 와 그 함수 내부에서 선언된 함수의 조합을 말합니다.

<br/>

``Closure`` 가 발생하는 경우는 다음과 같습니다.
  1. 함수 A 의 내부에서 정의한 함수 B가 있습니다.
  2. 함수 A 에서 함수 B를 호출 합니다.
  3. 호출된 함수 B는 함수 A 의 변수에 접근할 수 있게 됩니다.

  ```javascript
    function a() {
      const name = "Kim";

      function b() {
        // 함수 b 의 scope 밖에 있는 a.name 에 접근
        console.log("name: ", name);
      }

      b(); // "Kim" 출력
    }

    a();
  ```

<br/>

위 현상은 다음과 같이 풀어볼 수 있습니다.
  1. 함수 B의 ``LexicalEnvironment.outerEnvironmentReference`` 는 함수 A 의 ``LexicalEnvironment`` 를 참조 합니다.
  2. 함수 B의 ``outerEnvironmentReference`` 를 통해서 함수 A의 ``EnvironmentRecord`` 에 접근할 수 있습니다.

<br/>

즉, 컨텍스트 A에서 선언한 변수를, 내부함수 B에서 접근할 수 있는 현상 입니다.


<br/><br/>


Javascript 는 참조되지 않는 변수, 객체, 함수는 삭제 시킵니다. (가비지 컬렉션)

만약 그 함수의 변수를 참조하는 내부 함수가 있을경우 (Closure 가 있을경우), 내부함수를 외부에서 참조하도록 하면, ``closure`` 가 참조중인 상태가 되므로, 가비지 컬렉션의 대상에서 제외 됩니다.

즉, Closure 로 참조하는 내부 함수를 외부에서 참조중이라면 메모리 공간을 계속 유지하게 됩니다.

> ``컨텍스트 A`` 에서 선언한 ``변수 a`` 를 참조하는 ``내부함수 B`` 를, ``컨텍스트 A`` 의 ``외부로 전달`` 할 경우, 컨텍스트 A가 종료된 이후에도 ``변수 a 가 사라지지 않는 현상`` 입니다.

```javascript
function a() {
  let a = 1;

  function b() {
    return ++a;
  } 

  return b;
}

const bOther = a();
console.log("bOther() 호출: ", bOther()); // 2 출력
console.log("bOther() 호출: ", bOther()); // 3 출력
```


<br/><br/>


``Closure`` 를 사용하게 되면, 함수 종료 후에도 사라지자 않는 지역변수로 사용하게 됩니다.

(``Closure`` 를 사용하는 내부함수가 정의되는 시점의 ``Closure`` 상태로 사용)
const stack = {}
function MyClass () {

}
for (let i = 0; i < 100000000; i++) {
  stack[i] = new MyClass()
}

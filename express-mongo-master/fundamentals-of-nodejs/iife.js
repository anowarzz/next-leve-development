((require, module, __filename, __dirname) => {
  let a = 12;
  ((name) => {
    let a = 10;
    console.log(`Learning ${name}`);
  })("node");

  console.log(a);
  console.log(module);
  console.log(__dirname);
})(require, module, __filename, __dirname);

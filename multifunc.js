// //1st way to export all function---
// exports.meet1 = function meet1()
// {
//     console.log("meet1 is called");
//     return "meet1 is called and returned";
// }
// exports.meet2 = function meet2()
// {
//     console.log("meet2 is called");
//     return "meet2 is called and returned";
// }
// exports.meet3 = function meet3()
// {
//     console.log("meet3 is called");
//     return "meet3 is called and returned";
// }
// exports.meet4 = function meet4()
// {
//     console.log("meet4 is called");
//     return "meet4 is called and returned";
// }

//2nd way to export all function---
function meet1()
{
    console.log("meet1 is called");
    return "meet1 is called and returned";
}
function meet2()
{
    console.log("meet2 is called");
    return "meet2 is called and returned";
}
function meet3()
{
    console.log("meet3 is called");
    return "meet3 is called and returned";
}
function meet4()
{
    console.log("meet4 is called");
    return "meet4 is called and returned";
}
module.exports = {meet1, meet2, meet3, meet4}
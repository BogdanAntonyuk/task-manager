require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5e664f8156605cd47817e3a3').then(task => {
//    console.log(task);
//    return Task.countDocuments({ completed: false })
//       .then(result => {
//          console.log(result);
//       })
//       .catch(e => {
//          console.log(e);
//       });
// });

const deleteTaskAndCount = async id => {
   const task = await Task.findByIdAndDelete(id);
   const count = await Task.countDocuments({ completed: false });
   return count;
};

deleteTaskAndCount('5e664f6956605cd47817e3a2')
   .then(count => {
      console.log(count);
   })
   .catch(e => {
      console.log(e);
   });

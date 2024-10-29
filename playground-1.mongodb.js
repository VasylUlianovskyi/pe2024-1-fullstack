// db.help();

// user users
// use('usersDB');

// --------------------------------

// --- collection (table) / document (row)
// [{},{},...] - collection
// {} - document

// ----- CRUD -----

// C insertOne({})/insertMany([])          INSERT
// R find({},{}).sort({}).limit().skip()   SELECT

// --- C - INSERT - insertOne({})/insertMany([])
// db.users.insertOne({ name: 'Test', age: 20 });
// db.users.insertOne({ name: 'Ivo', age: 35 });
// db.users.insertMany([
// {
//   firstName: 'Test3',
//   lastName: 'testovych3',
//   email: 'test@test.com',
//   birthday: new Date(1995, 5, 20),
//   isMarried: false,
//   yearsOfExperiense: 8,
//   gender: 'male',
// },
//   {
//     firstName: 'Test3',
//     lastName: 'testovych3',
//     email: 'test2@test.com',
//     birthday: new Date(1998, 1, 5),
//     yearsOfExperiense: 5,
//     gender: 'female',
//     languages: ['EN', 'UA'],
//     phone: {
//       work: '+380987654321',
//       home: '+380987654322',
//     },
//   },
//   {
//     firstName: 'Test3',
//     lastName: 'testovych3',
//     email: 'test2@test.com',
//     birthday: new Date(1998, 1, 5),
//     yearsOfExperiense: 5,
//     gender: 'female',
//     languages: ['EN', 'UA'],
//     phone: {
//       work: '+380987654321',
//       home: '+380987654322',
//     },
//   },
//   {
//     firstName: 'Test4',
//     lastName: 'testovych4',
//     email: 'test2@test.com',
//     birthday: new Date(1998, 1, 5),
//     yearsOfExperiense: 5,
//     gender: 'female',
//     languages: ['UA', 'EN'],
//     phone: {
//       work: '+380987654321',
//       home: '+380987654322',
//     },
//   },
//   {
//     firstName: 'Test5',
//     lastName: 'testovych5',
//     email: 'test2@test.com',
//     birthday: new Date(1998, 1, 5),
//     yearsOfExperiense: 5,
//     gender: 'female',
//     languages: ['EN', 'UA', 'PL'],
//     phone: {
//       work: '+380987654321',
//       home: '+380987654322',
//     },
//   },
// ]);

// --- R - SELECT - find()

// пагінація - LIMIT OFFSET - limit skip
// db.users.find().limit(2).skip(2);

// сортування - ORDER BY - sort
//  1 - ASC
// -1 - DESC

// db.users.find().sort({ yearsOfExperience: -1 });

// пагінація + сортування
// відобразити другу сторінку з 3 користувачів, впорядкованих за імейл за з

// db.users.find().sort({ email: 1 }).limit(3).skip(3);

// проєкція
// SELECT first_name ...

// ----- проекція ---- SELECT firstName
//           WHERE    SELECT firstName
//               \    /
// db.users.find({}, { firstName: 1 })
// db.users.find({}, { firstName: 1, _id: 0 })

// db.users.find({}, { firstName: 1, lastName: 1 });

// фільтрація - WHERE - find({})
// gender = 'male'
// db.users.find({ gender: 'male' });

// WHERE firstName = 'Test1' AND isMarried = false
// db.users.find({ firstName: 'Test1', lastName: 'testovych1' });

// WHERE firstName = 'Test1' OR lastName = 'testovych2'
// db.users.find({ $or: [{ firstName: 'Test2' }, { lastName: 'testovych1' }] });

// WHERE yearsOfExperience > 4
// db.users.find({ yearsOfExperience: { $gt: 4 } });

// birthDate від 1990 до 1999
// birthDate >= 1990-01-01 AND birthDate <= 1999-12-31
// db.users.find({
//   $and: [
//     { birthDate: { $gte: new Date(1990, 0, 1) } },
//     { birthDate: { $lte: new Date(1999, 11, 31) } },
//   ],
// });

// Загальний вигляд:
// db.collection.find({ фільтрация }, { проекція }).sort({}).limit().skip()

// Вбудовані документи
// from Lviv
// db.users.find({ 'address.city': 'Lviv' });

// ['EN', 'UA'], ['EN', 'UA'], ['UA','EN'], ['EN', 'UA', "PL"]
// повні відповідність
// db.users.find({ languages: ['EN', 'UA'] });
// мають міститися
// db.users.find({ languages: { $all: ['EN', 'UA'] } });
// має міститися
// db.users.find({ languages: 'PL' });

// db.users.updateOne({ name: 'Test' }, { $set: { name: 'newTest' } });

// db.users.updateOne(
//   { _id: ObjectId('671e586f3976e576f165f84b') },
//   { $set: { age: 21 } }
// );

// D - DELETE - deleteOne/Many({})

// db.users.deleteOne({ _id: ObjectId('671e5937a5f957efeaeacc9e') });

// db.users.aggregate([
//   {
//     $group: {
//       _id: '$gender',
//       peopleCount: {
//         $count: {},
//       },
//     },
//   },
//   {
//     $sort: {
//       peopleCount: 1,
//     },
//   },
// ]);

// порахувати кількість чолвіків і жінок,
// які мають років досвіду > 4

// db.users.aggregate([
//   {
//     $match: {
//       yearsOfExperience: { $gt: 4 },
//     },
//   },
//   {
//     $group: {
//       _id: '$gender',
//       peopleCount: {
//         $count: {},
//       },
//     },
//   },
// ]);

// відобразити сумарну кількість років досвіду серед жінок і чоловіків
// db.users.aggregate([
//   {
//     $group: {
//       _id: '$gender',
//       sumYearsOfExp: {
//         $sum: '$yearsOfExperience',
//       },
//     },
//   },
// ]);

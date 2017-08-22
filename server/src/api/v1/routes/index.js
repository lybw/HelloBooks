import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const UserClass = controllers.UserClass;
const BookClass = controllers.BookClass;
const StockManagerClass = controllers.StockManagerClass;
const BookCategoryClass = controllers.BookCategoryClass;
const authMiddleware = middlewares.middleware;
const userMiddleware = middlewares.userMiddleware;
const adminMiddleware = middlewares.adminMiddleware;
const router = express.Router();

router.get('/', (req, res) =>
  res.send({ message: 'Hello, welcome to Hello-Books Api version 1' }));

router.post('/users/signup', UserClass.signup);
router.post('/users/signin', UserClass.signin);

router.route('/users/:userId/books')
  .post(authMiddleware, userMiddleware, BookClass.borrowBook)
  .get(authMiddleware, userMiddleware, BookClass.getBorrowedBook)
  .put(authMiddleware, userMiddleware, BookClass.returnBorrowedBook);

router.route('/books')
  .post(authMiddleware, authMiddleware, BookClass.create)
  .put(authMiddleware, authMiddleware, BookClass.edit)
  .get(authMiddleware, authMiddleware, BookClass.get);

router.route('/books/categories')
  .post(authMiddleware, adminMiddleware, BookCategoryClass.add)
  .put(authMiddleware, adminMiddleware, BookCategoryClass.update)
  .delete(authMiddleware, adminMiddleware, BookCategoryClass.delete)
  .get(authMiddleware, authMiddleware, BookCategoryClass.get);

router.route('/books/stocks')
  .post(authMiddleware, adminMiddleware, StockManagerClass.create)
  .delete(authMiddleware, adminMiddleware, StockManagerClass.delete)
  .get(authMiddleware, adminMiddleware, StockManagerClass.get);


// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
router.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({ message: res.locals.message, status: 'Not Found', code: err.status });
});

export default router;
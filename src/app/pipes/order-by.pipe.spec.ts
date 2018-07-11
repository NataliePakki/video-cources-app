import { OrderByPipe } from './order-by.pipe';
import { CourseItem } from '../course-list/models/course-item';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  const firstCourseListItem = new CourseItem(1, 'abcd', 'Natalie', 'efg', 0, new Date(2018, 4, 4));
  const secondCourseListItem =  new CourseItem(2, 'ihl', 'Pakki', 'yzd', 0, new Date(2017, 4, 4));

  const courseListItems = [
    firstCourseListItem, secondCourseListItem
  ];
  it('create an instance', () => {
    pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should orderBy date', () => {
    const actual = pipe.transform(courseListItems, 'creationDate');
    expect(actual).toEqual([ secondCourseListItem, firstCourseListItem]);
  });
});

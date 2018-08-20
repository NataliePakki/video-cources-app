import { OrderByPipe } from './order-by.pipe';
import { Course } from '../courses/models/course';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  const firstCourse = new Course(1, 'abcd', 'Natalie', 'efg', 0, '2018-04-04');
  const secondCourse =  new Course(2, 'ihl', 'Pakki', 'yzd', 0, '2017-04-04');

  let courses = [
    firstCourse, secondCourse
  ];
  it('create an instance', () => {
    pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should orderBy date', () => {
    const actual = pipe.transform(courses, 'creationDate');
    expect(actual).toEqual([ secondCourse, firstCourse]);
  });

  it('should orderBy date', () => {
    courses = [
      secondCourse, firstCourse
    ];
    const actual = pipe.transform(courses, 'creationDate');
    expect(actual).toEqual([ secondCourse, firstCourse]);
  });

  it('should return courseList when orderBy not date', () => {
    const actual = pipe.transform(courses, 'another');
    expect(actual).toEqual(courses);
  });
});

import { FindPipe } from './find.pipe';
import { CourseItem } from '../course-list/models/course-item';

describe('FindPipe', () => {
  let pipe: FindPipe;
  const firstCourseListItem = new CourseItem(1, 'abcd', 'Natalie', 'efg');
  const secondCourseListItem =  new CourseItem(2, 'ihl', 'Pakki', 'yzd');

  const courseListItems = [
    firstCourseListItem, secondCourseListItem
  ];

  it('create an instance', () => {
    pipe = new FindPipe();
    expect(pipe).toBeTruthy();
  });

  it('should find by title', () => {
    let actual = pipe.transform(courseListItems, 'abcd');
    expect(actual).toEqual([ firstCourseListItem ]);

    actual = pipe.transform(courseListItems, 'h');
    expect(actual).toEqual([ secondCourseListItem ]);
  });

  it('should find by name', () => {
    let actual = pipe.transform(courseListItems, 'Natalie');
    expect(actual).toEqual([ firstCourseListItem ]);

    actual = pipe.transform(courseListItems, 'Pakki');
    expect(actual).toEqual([ secondCourseListItem ]);
  });

  it('should find by description', () => {
    let actual = pipe.transform(courseListItems, 'efg');
    expect(actual).toEqual([ firstCourseListItem ]);

    actual = pipe.transform(courseListItems, 'yzd');
    expect(actual).toEqual([ secondCourseListItem ]);
  });

  it('should not find', () => {
    const actual = pipe.transform(courseListItems, 'zzzzz');
    expect(actual).toEqual([  ]);
  });
});

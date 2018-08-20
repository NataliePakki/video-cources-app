import { FindPipe } from './find.pipe';
import { Course } from '../courses/models/course';

describe('FindPipe', () => {
  let pipe: FindPipe;
  const firstCourse = new Course(1, 'abcd', 'Natalie', 'efg');
  const secondCourse =  new Course(2, 'ihl', 'Pakki', 'yzd');

  const courses = [
    firstCourse, secondCourse
  ];

  it('create an instance', () => {
    pipe = new FindPipe();
    expect(pipe).toBeTruthy();
  });

  it('should find by title', () => {
    let actual = pipe.transform(courses, 'abcd');
    expect(actual).toEqual([ firstCourse ]);

    actual = pipe.transform(courses, 'h');
    expect(actual).toEqual([ secondCourse ]);
  });

  it('should find by name', () => {
    let actual = pipe.transform(courses, 'Natalie');
    expect(actual).toEqual([ firstCourse ]);

    actual = pipe.transform(courses, 'Pakki');
    expect(actual).toEqual([ secondCourse ]);
  });

  it('should find by description', () => {
    let actual = pipe.transform(courses, 'efg');
    expect(actual).toEqual([ firstCourse ]);

    actual = pipe.transform(courses, 'yzd');
    expect(actual).toEqual([ secondCourse ]);
  });

  it('should not find', () => {
    const actual = pipe.transform(courses, 'zzzzz');
    expect(actual).toEqual([  ]);
  });
});

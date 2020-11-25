import getCurrentScrollTop from './getCurrentScrollTop';

describe('getCurrentScrollTop', () => {

  const length = 20;
  const itemHeight = 30;
  const currentIndex = 6;

  it('when size is 5 and position is 3', () => {
    const maxVisibleItemNumber = 5;
    const position =3;

    expect(
      getCurrentScrollTop({
        maxVisibleItemNumber,position,currentIndex,length,itemHeight
      })
    ).toBe(120);
  });

  it('when size is 4 and position is 2', () => {
    const maxVisibleItemNumber = 5;
    const position =2;

    expect(
      getCurrentScrollTop({
        maxVisibleItemNumber,position,currentIndex,length,itemHeight
      })
    ).toBe(150);
  });
});

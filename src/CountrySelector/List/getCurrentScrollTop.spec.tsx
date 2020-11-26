import getCurrentScrollTop from "./getCurrentScrollTop";

describe("getCurrentScrollTop", () => {
  const itemHeight = 30;
  const currentIndex = 6;

  it("when size is 5 and position is 3", () => {
    const maxVisibleNumber = 5;
    const position = 3;

    expect(
      getCurrentScrollTop({
        maxVisibleNumber,
        position,
        currentIndex,
        itemHeight,
      })
    ).toBe(120);
  });

  it("when size is 4 and position is 2", () => {
    const maxVisibleNumber = 5;
    const position = 2;

    expect(
      getCurrentScrollTop({
        maxVisibleNumber,
        position,
        currentIndex,
        itemHeight,
      })
    ).toBe(150);
  });
});

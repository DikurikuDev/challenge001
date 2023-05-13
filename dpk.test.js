const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partitionKey when given event.partitionKey", () => {
    const event = {partitionKey: "mypartitionKey"}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns hash when given no event without partitionKey", () => {
    const event = {data: "mydata"}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("09c6b3f8385299b1f20cc075da6682cac6d634d39e710ef3bedc7c27480ae6591dd50ba0e555fca28c902746d1126a2f776ad7f4777a07812bdeb13099c46bab");
  });

  it("Returns string when given obj as event.partitionKey", () => {
    const event = {partitionKey: {data: "mydata"}}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });

  it("Returns hash when given event.partitionKey greater than 256 chars", () => {
    const event = {partitionKey: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ante magna, congue nec sem sed, viverra pellentesque dui. Phasellus blandit tincidunt purus, ut aliquet metus consequat tempor. Praesent eleifend augue vitae nunc pharetra, bibendum sagittis ipsum hendrerit. Nunc ac libero ut ex auctor placerat. Nam fermentum libero non lectus iaculis molestie. Aliquam ut justo tincidunt, hendrerit velit at, tincidunt mauris. Duis tristique consectetur magna quis ultrices. Donec pharetra, nisi ut posuere ultrices, velit lacus mollis nibh, eget ultricies nisi erat hendrerit odio."}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("d4d87f121cf13cc7713df735177ea5bebea37f438ab2a5946c85efb3de4decfa9aa91b077de608f9ef2f163ad74ffc29478a91a967723ff1ca202bcb13f3a4b6");
  });
});

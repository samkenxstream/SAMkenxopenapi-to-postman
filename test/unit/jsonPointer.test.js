
const expect = require('chai').expect,
  { jsonPointerEncodeAndReplace,
    getJsonPointerRelationToRoot,
    concatJsonPointer,
    getKeyInComponents } = require('./../../lib/jsonPointer');

describe('getKeyInComponents function', function () {
  it('should return [[], true] when is pointing to an element in components', function () {
    const result = getKeyInComponents(['components', 'schemas'], 'pet.yaml');
    expect(result).to.be.an('array').with.length(2);
    expect(result[0].length).to.equal(0);
    expect(result[1]).to.equal(true);
  });

  it('should return [[], true] when is pointing to a local ref in components',
    function () {
      const result = getKeyInComponents(['components', 'schemas'], 'pet.yaml', '/definitions/world');
      expect(result).to.be.an('array').with.length(2);
      expect(result[0].length).to.equal(0);
      expect(result[1]).to.equal(true);
    });

  it('should return [["schemas", "folder/pet.yaml"], false] when there is an scaped slash', function () {
    const result = getKeyInComponents(['path', 'schemas'], 'folder~1pet.yaml');
    expect(result).to.be.an('array').with.length(2);
    expect(result[0].length).to.equal(2);
    expect(result[0][0]).to.equal('schemas');
    expect(result[1]).to.equal(false);
  });
});


describe('getJsonPointerRelationToRoot function', function () {
  it('should return "#/components/schemas/Pets.yaml" no local path and schema', function () {
    let res = getJsonPointerRelationToRoot(
      jsonPointerEncodeAndReplace,
      'Pets.yaml',
      ['schemas', 'Pets.yaml']
    );
    expect(res).to.equal('#/components/schemas/Pets.yaml');
  });
  it('should return "#/components/schemas/hello.yaml" no local path and schema', function () {
    let res = getJsonPointerRelationToRoot(
      jsonPointerEncodeAndReplace,
      'hello.yaml#/definitions/world',
      ['schemas', 'hello.yaml']
    );
    expect(res).to.equal('#/components/schemas/hello.yaml');
  });
  it('should return "#/components/schemas/Error" no file path', function () {
    let res = getJsonPointerRelationToRoot(
      jsonPointerEncodeAndReplace,
      '#/components/schemas/Error',
      ['components', 'schemas', 'Error']
    );
    expect(res).to.equal('#/components/schemas/Error');
  });
});

describe('concatJsonPointer function ', function () {
  it('should return "#/components/schemas/Pets.yaml" no local path and schema', function () {
    let res = concatJsonPointer(
      jsonPointerEncodeAndReplace,
      ['schemas', 'Pets.yaml']
    );
    expect(res).to.equal('#/components/schemas/Pets.yaml');
  });

  it('should return "#/components/schemas/other~1Pets.yaml" no local path and schema folder in filename', function () {
    let res = concatJsonPointer(
      jsonPointerEncodeAndReplace,
      ['schemas', 'other/Pets.yaml']
    );
    expect(res).to.equal('#/components/schemas/other~1Pets.yaml');
  });
  it('should return "#/components/schemas/some~1Pet" no local path and schema folder in filename', function () {
    let res = concatJsonPointer(
      jsonPointerEncodeAndReplace,
      ['schemas', 'some/Pet.yaml']
    );
    expect(res).to.equal('#/components/schemas/some~1Pet.yaml');
  });
  it('should return "#/components/schemas/hello.yaml" no local path and schema', function () {
    let res = concatJsonPointer(
      jsonPointerEncodeAndReplace,
      ['schemas', 'hello.yaml']
    );
    expect(res).to.equal('#/components/schemas/hello.yaml');
  });

  it('should return "#/components/schemas/~1Pets.yaml" no local path and schema', function () {
    let res = concatJsonPointer(
      jsonPointerEncodeAndReplace,
      ['schemas', '/Pets.yaml']
    );
    expect(res).to.equal('#/components/schemas/~1Pets.yaml');
  });

});

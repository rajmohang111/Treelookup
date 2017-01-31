'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('TreeSearch', function() {

    beforeEach(function() {
      browser.get('index.html#!/TreeSearch');
    });


    it('should render view1 when user navigates to /TreeSearch', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for TreeSearch/);
    });

  });

});

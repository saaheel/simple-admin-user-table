import React from 'react'
import MaterialDataTable from '..MaterialDataTable/'
import {mount, unmount} from 'enzyme'
import Root from 'Root'

let wrapper;



beforeEach(() => {
    wrapper = mount(<Root><MaterialDataTable></MaterialDataTable></Root>)
})

afterEach(() => {
    wrapper = unmount();
})

test("has a title", () => {

});
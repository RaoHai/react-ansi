import React from 'react';
import { render } from '@testing-library/react';
import ReactAnsi from '..';

const log = `
  +travis_fold:start:worker_info
  [0K[33;1mWorker information[0m
  hostname: c4e24843-fe4e-441b-8e77-925ce34858d8@1.worker-org-977b464db-xq2mf.gce-production-2
  version: v6.2.1 https://github.com/travis-ci/worker/tree/4e3246c044eb4915c2378ffacd0b3d3ed0136bba
  instance: travis-job-db13ee58-4559-4788-9ee1-483b6a3fbaeb travis-ci-sardonyx-xenial-1553530528-f909ac5 (via amqp)
  startup: 8.41983438s
  travis_fold:end:worker_info
`;

describe('react-ansi', () => {
  it('should render', () => {
    const wrapper = render(<ReactAnsi log={log} />);
    expect(wrapper);
  });

  it('should render virtual', () => {
    const wrapper = render(<ReactAnsi log={log} virtual />);
    expect(wrapper);
  });
});

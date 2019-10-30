import { useEffect, useState } from "react";

const log = `travis_fold:start:worker_info
[0K[33;1mWorker information[0m
hostname: 319dca05-3ddb-43cc-9e2b-c4f9e2cbb703@1.production-1-worker-org-gce-z0f9
version: v6.2.0 https://github.com/travis-ci/worker/tree/5e5476e01646095f48eec13196fdb3faf8f5cbf7
instance: travis-job-dd36fd97-4be0-4674-b336-73ef937782e6 travis-ci-garnet-trusty-1512502259-986baf0 (via amqp)
startup: 6.492379618s
travis_fold:end:worker_info
[0Ktravis_fold:start:system_info
[0K[33;1mBuild system information[0m
Build language: node_js
Build group: stable
Build dist: trusty
Build id: 539618889
Job id: 539618890
Runtime kernel version: 4.4.0-101-generic
travis-build version: 0a1b60afb
[34m[1mBuild image provisioning date and time[0m
Tue Dec  5 19:58:13 UTC 2017
[34m[1mOperating System Details[0m
Distributor ID:	Ubuntu
Description:	Ubuntu 14.04.5 LTS
Release:	14.04
Codename:	trusty
[34m[1mCookbooks Version[0m
7c2c6a6 https://github.com/travis-ci/travis-cookbooks/tree/7c2c6a6
[34m[1mgit version[0m
git version 2.15.1
[34m[1mbash version[0m
GNU bash, version 4.3.11(1)-release (x86_64-pc-linux-gnu)
[34m[1mgcc version[0m
gcc (Ubuntu 4.8.4-2ubuntu1~14.04.3) 4.8.4
Copyright (C) 2013 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

[34m[1mdocker version[0m
Client:
 Version:      17.09.0-ce
 API version:  1.32
 Go version:   go1.8.3
 Git commit:   afdb6d4
 Built:        Tue Sep 26 22:42:38 2017
 OS/Arch:      linux/amd64

Server:
 Version:      17.09.0-ce
 API version:  1.32 (minimum version 1.12)
 Go version:   go1.8.3
 Git commit:   afdb6d4
 Built:        Tue Sep 26 22:41:20 2017
 OS/Arch:      linux/amd64
 Experimental: false
[34m[1mclang version[0m
clang version 5.0.0 (tags/RELEASE_500/final)
Target: x86_64-unknown-linux-gnu
Thread model: posix
InstalledDir: /usr/local/clang-5.0.0/bin
[34m[1mjq version[0m
jq-1.5
[34m[1mbats version[0m
Bats 0.4.0
[34m[1mshellcheck version[0m
0.4.6
[34m[1mshfmt version[0m
v2.0.0
[34m[1mccache version[0m
ccache version 3.1.9

Copyright (C) 2002-2007 Andrew Tridgell
Copyright (C) 2009-2011 Joel Rosdahl
`;

const logs = log.split('\n');

export default function RealTime({ children }) {
  const [pos, setPos] = useState(5);

  let timeout;

  useEffect(() => {
    timeout = setTimeout(() => {
      setPos(pos => pos > logs.length ? 5 : pos + 1);
    }, 1000);

    return () => clearTimeout(timeout);
  });

  return children({ log: logs.slice(0, pos).join('\n') });
}
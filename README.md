# Reproduction of request piping issue.

To reproduce [*], do the following.

1. `npm install`
2. `node pipe.js`
3. `curl "http://$HOST:8081" > /dev/null` [from an external host]
4. ctrl-c to kill the above BEFORE it finishes downloading
5. repeat step 3. Note it times out.

Note that manually killing the input stream when the output stream closes fixes the issue.

[*] Problem has been observed on Ubuntu 14.04 running on AWS. Doesn't seem to occur on OS X 10.10 (requests seem to end after around 1 min).
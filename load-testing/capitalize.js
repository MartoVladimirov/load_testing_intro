import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
        shared_iter_scenario: {
            executor: "shared-iterations",
            vus: 10,
            iterations: 100,
            startTime: "0s",
        },
        per_vu_scenario: {
            executor: "per-vu-iterations",
            vus: 10,
            iterations: 10,
            startTime: "10s",
        },
    },
};

export default function () {
    const url = 'http://localhost:8080/capitalize';
    const payload = JSON.stringify({
        name: 'testname',
        email: 'testemail@example.com',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);
    
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response contains uppercased name': (r) => JSON.parse(r.body).name === 'TESTNAME',
        'response contains uppercased email': (r) => JSON.parse(r.body).email === 'TESTEMAIL@EXAMPLE.COM',
    });
    
    sleep(1);
}

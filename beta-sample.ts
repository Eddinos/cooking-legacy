// Merci https://github.com/jstat/jstat

export function sampleBetaLaw (alpha: number, beta: number) {
    const u = randg(alpha);
    return u / (u + randg(beta));
}

// Returns a gamma deviate by the method of Marsaglia and Tsang.
function randg (shape: number) {
    const oalph = shape;
    let a1, a2, u, v, x, mat;

    if (!shape) shape = 1;
    if (shape < 1) shape += 1;

    a1 = shape - 1 / 3;
    a2 = 1 / Math.sqrt(9 * a1);

    do {
        do {
          x = randn();
          v = 1 + a2 * x;
        } while(v <= 0);
        v = v * v * v;
        u = Math.random();
    } while(u > 1 - 0.331 * Math.pow(x, 4) && Math.log(u) > 0.5 * x*x + a1 * (1 - v + Math.log(v)));
    // alpha > 1
    if (shape == oalph) {
        return a1 * v;
    }
    // alpha < 1
    do {
        u = Math.random();
    } while(u === 0);
      
    return Math.pow(u, 1 / oalph) * a1 * v;
}

// Returns a normal deviate (mu=0, sigma=1).
function randn () {
    let u, v, x, y, q;

    do {
        u = Math.random();
        v = 1.7156 * (Math.random() - 0.5);
        x = u - 0.449871;
        y = Math.abs(v) + 0.386595;
        q = x * x + y * (0.19600 * y - 0.25472 * x);
      } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));
      return v / u;
}

interface DistributionPoint {
    value: number,
    count: number
}

export function generateDistribution (valueNb: number, alpha: number = 2, beta: number = 4): DistributionPoint[] {
    const values: number[] = []
    for (let i = 0; i<valueNb; i++) {
        values.push(Math.round(sampleBetaLaw(alpha, beta) * 100))
    }

    values.sort((a, b) => a - b)

    return values.reduce((arr: DistributionPoint[], acc) => {
        const existingValue = arr.find(x => x.value === acc)
        if (existingValue) existingValue.count ++
        else arr.push({
            value: acc,
            count: 1
        })
        return arr
    }, [])
}
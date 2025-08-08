// ============================================================================
// COMPREHENSIVE TESTING SUITE FUNCTIONS
// ============================================================================

function testFullTimelineValidation() {
    console.group('📊 TEST PROTOCOL 1: Full-Timeline Monthly Projection Validation');
    console.log('Testing mathematical integrity across entire 60-month projection timeline');
    
    // Set baseline inputs for comprehensive testing
    setBaselineTestInputs();
    
    // Set projection to maximum 60 months
    document.getElementById('projectionMonths').value = 60;
    document.getElementById('projectionSlider').value = 60;
    
    const results = performCalculations();
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    console.log('\n🔍 Testing each month of the 60-month projection...');
    
    for (let month = 1; month <= 60; month++) {
        console.group(`Month ${month}`);
        
        // Calculate expected values from first principles
        const expectedValues = calculateExpectedValuesForMonth(month, results);
        
        // Get actual values from projection arrays
        const actualValues = {
            revenue: results.revenueProjection[month - 1],
            expenses: results.expensesProjection[month - 1],
            netIncome: results.incomeProjection[month - 1],
            bankBalance: results.bankAccountProjection[month - 1]
        };
        
        // Test each metric
        const tests = [
            { name: 'Gross Revenue', expected: expectedValues.revenue, actual: actualValues.revenue, tolerance: 0.01 },
            { name: 'Total Expenses', expected: expectedValues.expenses, actual: actualValues.expenses, tolerance: 0.01 },
            { name: 'Net Income', expected: expectedValues.netIncome, actual: actualValues.netIncome, tolerance: 0.01 },
            { name: 'Bank Balance', expected: expectedValues.bankBalance, actual: actualValues.bankBalance, tolerance: 0.01 }
        ];
        
        tests.forEach(test => {
            totalTests++;
            const difference = Math.abs(test.expected - test.actual);
            const percentDifference = (difference / test.expected) * 100;
            const passed = percentDifference <= test.tolerance;
            
            if (passed) {
                passedTests++;
                console.log(`✅ ${test.name}: PASS (${percentDifference.toFixed(3)}% diff)`);
            } else {
                failedTests.push({
                    month: month,
                    metric: test.name,
                    expected: test.expected,
                    actual: test.actual,
                    difference: difference,
                    percentDifference: percentDifference
                });
                console.warn(`❌ ${test.name}: FAIL (${percentDifference.toFixed(3)}% diff)`);
                console.warn(`   Expected: $${test.expected.toLocaleString()}, Actual: $${test.actual.toLocaleString()}`);
            }
        });
        
        console.groupEnd();
    }
    
    const successRate = (passedTests / totalTests) * 100;
    console.log(`\n📋 Timeline Validation Results:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests}`);
    console.log(`   Failed: ${failedTests.length}`);
    console.log(`   Success Rate: ${successRate.toFixed(2)}%`);
    
    if (failedTests.length > 0) {
        console.warn('\n❌ FAILED TESTS:');
        failedTests.slice(0, 10).forEach(fail => { // Show first 10 failures
            console.warn(`   Month ${fail.month} - ${fail.metric}: ${fail.percentDifference.toFixed(3)}% difference`);
        });
        if (failedTests.length > 10) {
            console.warn(`   ... and ${failedTests.length - 10} more failures`);
        }
    }
    
    console.groupEnd();
    return { passed: passedTests, total: totalTests, failed: failedTests, successRate: successRate };
}

function setBaselineTestInputs() {
    // Set comprehensive baseline inputs for testing
    const baselineInputs = {
        'pricePerLesson': 150,
        'phase1Lessons': 50,
        'phase2Lessons': 60,
        'phase3Lessons': 70,
        'phase4Lessons': 80,
        'fixedRent': 2000,
        'taxes': 300,
        'insurance': 150,
        'utilities': 200,
        'software': 100,
        'cleaning': 150,
        'maintenance': 100,
        'otherCostValue': 0,
        'royaltyFeeRate': 7,
        'ccFeeRate': 3,
        'monthlyAdSpend': 8464,
        'leadConversionRate': 20,
        'generalInflationRate': 2.5,
        'priceIncreaseRate': 3,
        'payrollIncreaseRate': 3,
        'opCostIncreaseRate': 2,
        'sp500Rate': 10,
        'cdRate': 4,
        'workableWeeksPerYear': 50,
        'initialInvestment': 50000,
        'medalBallRevenue': 0,
        'medalBallCost': 0,
        'showcaseRevenue': 0,
        'showcaseCost': 0,
        'danceORamaRevenue': 0,
        'danceORamaCost': 0,
        'otherEventsRevenue': 0,
        'otherEventsCost': 0,
        'maxLessonsPerInstructor': 35,
        'avgInstructorRate': 25
    };
    
    Object.keys(baselineInputs).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = baselineInputs[id];
        }
    });
    
    // Set payroll mode to automatic for baseline testing
    if (payrollMode !== 'automatic') {
        const toggle = document.getElementById('payrollModeToggle');
        if (toggle) {
            toggle.checked = true;
            toggle.dispatchEvent(new Event('change'));
        }
    }
}

function calculateExpectedValuesForMonth(month, results) {
    // Get baseline values
    const pricePerLesson = parseFloat(document.getElementById('pricePerLesson').value) || 150;
    const phase1Lessons = parseFloat(document.getElementById('phase1Lessons').value) || 50;
    const phase2Lessons = parseFloat(document.getElementById('phase2Lessons').value) || 60;
    const phase3Lessons = parseFloat(document.getElementById('phase3Lessons').value) || 70;
    const phase4Lessons = parseFloat(document.getElementById('phase4Lessons').value) || 80;
    const workableWeeksPerYear = parseFloat(document.getElementById('workableWeeksPerYear').value) || 50;
    const onRampDuration = parseInt(document.getElementById('onRampSlider').value) || 6;
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value) || 50000;
    
    // Calculate growth factors
    const generalInflationRate = parseFloat(document.getElementById('generalInflationRate').value) || 2.5;
    const priceIncreaseRate = parseFloat(document.getElementById('priceIncreaseRate').value) || 3;
    const payrollIncreaseRate = parseFloat(document.getElementById('payrollIncreaseRate').value) || 3;
    const opCostIncreaseRate = parseFloat(document.getElementById('opCostIncreaseRate').value) || 2;
    
    const effectivePriceRate = generalInflationRate + priceIncreaseRate;
    const effectivePayrollRate = generalInflationRate + payrollIncreaseRate;
    const effectiveFixedCostRate = generalInflationRate + opCostIncreaseRate;
    
    // Calculate monthly growth factors
    const priceGrowth = Math.pow(1 + effectivePriceRate / 100, (month - 1) / 12);
    const payrollGrowth = Math.pow(1 + effectivePayrollRate / 100, (month - 1) / 12);
    const fixedCostGrowth = Math.pow(1 + effectiveFixedCostRate / 100, (month - 1) / 12);
    const generalInflationGrowth = Math.pow(1 + generalInflationRate / 100, (month - 1) / 12);
    
    // Calculate lesson capacity for this month
    let currentLessonCapacity;
    if (month <= onRampDuration) {
        const rampProgress = month / onRampDuration;
        currentLessonCapacity = phase1Lessons * rampProgress;
    } else {
        const averageLessonsPerWeek = (phase1Lessons + phase2Lessons + phase3Lessons + phase4Lessons) / 4;
        currentLessonCapacity = averageLessonsPerWeek;
    }
    
    // Calculate expected revenue
    const weeksPerMonth = workableWeeksPerYear / 12;
    const monthlyLessons = currentLessonCapacity * weeksPerMonth;
    const expectedRevenue = monthlyLessons * pricePerLesson * priceGrowth;
    
    // Calculate expected expenses
    const totalFixedCosts = parseFloat(document.getElementById('fixedRent').value) || 0 +
                          parseFloat(document.getElementById('taxes').value) || 0 +
                          parseFloat(document.getElementById('insurance').value) || 0 +
                          parseFloat(document.getElementById('utilities').value) || 0 +
                          parseFloat(document.getElementById('software').value) || 0 +
                          parseFloat(document.getElementById('cleaning').value) || 0 +
                          parseFloat(document.getElementById('maintenance').value) || 0 +
                          parseFloat(document.getElementById('otherCostValue').value) || 0;
    
    const royaltyFeeRate = parseFloat(document.getElementById('royaltyFeeRate').value) || 7;
    const ccFeeRate = parseFloat(document.getElementById('ccFeeRate').value) || 3;
    const monthlyAdSpend = parseFloat(document.getElementById('monthlyAdSpend').value) || 0;
    
    const expectedRoyaltyFee = expectedRevenue * (royaltyFeeRate / 100);
    const expectedCreditCardFee = expectedRevenue * (ccFeeRate / 100);
    const expectedMarketing = monthlyAdSpend * generalInflationGrowth;
    
    // Calculate expected payroll (simplified for testing)
    const avgInstructorRate = parseFloat(document.getElementById('avgInstructorRate').value) || 25;
    const maxLessonsPerInstructor = parseFloat(document.getElementById('maxLessonsPerInstructor').value) || 35;
    const peakLessonsPerWeek = Math.max(phase1Lessons, phase2Lessons, phase3Lessons, phase4Lessons);
    const requiredInstructors = Math.ceil(peakLessonsPerWeek / maxLessonsPerInstructor);
    const lessonVolumeRatio = monthlyLessons / (peakLessonsPerWeek * weeksPerMonth);
    const expectedPayroll = requiredInstructors * maxLessonsPerInstructor * weeksPerMonth * avgInstructorRate * payrollGrowth * lessonVolumeRatio;
    
    const expectedVariableCosts = expectedPayroll + expectedRoyaltyFee + expectedCreditCardFee + expectedMarketing;
    const expectedFixedCosts = totalFixedCosts * fixedCostGrowth;
    const expectedExpenses = expectedFixedCosts + expectedVariableCosts;
    
    // Calculate expected net income
    const expectedNetIncome = expectedRevenue - expectedExpenses;
    
    // Calculate expected bank balance (cumulative)
    let expectedBankBalance = -initialInvestment;
    for (let m = 1; m <= month; m++) {
        const mPriceGrowth = Math.pow(1 + effectivePriceRate / 100, (m - 1) / 12);
        const mPayrollGrowth = Math.pow(1 + effectivePayrollRate / 100, (m - 1) / 12);
        const mFixedCostGrowth = Math.pow(1 + effectiveFixedCostRate / 100, (m - 1) / 12);
        const mGeneralInflationGrowth = Math.pow(1 + generalInflationRate / 100, (m - 1) / 12);
        
        let mLessonCapacity;
        if (m <= onRampDuration) {
            const rampProgress = m / onRampDuration;
            mLessonCapacity = phase1Lessons * rampProgress;
        } else {
            const averageLessonsPerWeek = (phase1Lessons + phase2Lessons + phase3Lessons + phase4Lessons) / 4;
            mLessonCapacity = averageLessonsPerWeek;
        }
        
        const mMonthlyLessons = mLessonCapacity * weeksPerMonth;
        const mRevenue = mMonthlyLessons * pricePerLesson * mPriceGrowth;
        const mRoyaltyFee = mRevenue * (royaltyFeeRate / 100);
        const mCreditCardFee = mRevenue * (ccFeeRate / 100);
        const mMarketing = monthlyAdSpend * mGeneralInflationGrowth;
        const mLessonVolumeRatio = mMonthlyLessons / (peakLessonsPerWeek * weeksPerMonth);
        const mPayroll = requiredInstructors * maxLessonsPerInstructor * weeksPerMonth * avgInstructorRate * mPayrollGrowth * mLessonVolumeRatio;
        const mVariableCosts = mPayroll + mRoyaltyFee + mCreditCardFee + mMarketing;
        const mFixedCosts = totalFixedCosts * mFixedCostGrowth;
        const mExpenses = mFixedCosts + mVariableCosts;
        const mNetIncome = mRevenue - mExpenses;
        
        expectedBankBalance += mNetIncome;
    }
    
    return {
        revenue: expectedRevenue,
        expenses: expectedExpenses,
        netIncome: expectedNetIncome,
        bankBalance: expectedBankBalance
    };
}

function testPayrollSystemDeepDive() {
    console.group('👥 TEST PROTOCOL 2: Payroll System Deep Dive');
    console.log('Testing both manual and automatic payroll modes under various conditions');
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    // Test Automatic Payroll Scenarios
    console.log('\n🤖 Testing Automatic Payroll Scenarios...');
    
    // Scenario A: Exact Fit
    console.group('Scenario A: Exact Fit (70 lessons, 35 max)');
    const scenarioAResult = testAutomaticPayrollScenario(70, 35, 25);
    totalTests += scenarioAResult.total;
    passedTests += scenarioAResult.passed;
    failedTests = failedTests.concat(scenarioAResult.failed);
    console.groupEnd();
    
    // Scenario B: Fractional Fit
    console.group('Scenario B: Fractional Fit (73.5 lessons, 35 max)');
    const scenarioBResult = testAutomaticPayrollScenario(73.5, 35, 25);
    totalTests += scenarioBResult.total;
    passedTests += scenarioBResult.passed;
    failedTests = failedTests.concat(scenarioBResult.failed);
    console.groupEnd();
    
    // Scenario C: Under Capacity
    console.group('Scenario C: Under Capacity (20 lessons, 35 max)');
    const scenarioCResult = testAutomaticPayrollScenario(20, 35, 25);
    totalTests += scenarioCResult.total;
    passedTests += scenarioCResult.passed;
    failedTests = failedTests.concat(scenarioCResult.failed);
    console.groupEnd();
    
    // Test Manual Payroll Scenarios
    console.log('\n👤 Testing Manual Payroll Scenarios...');
    
    // Scenario A: No Bonus
    console.group('Manual Scenario A: No Bonus');
    const manualAResult = testManualPayrollScenario(3, 5, 2.50, false);
    totalTests += manualAResult.total;
    passedTests += manualAResult.passed;
    failedTests = failedTests.concat(manualAResult.failed);
    console.groupEnd();
    
    // Scenario B: Single Bonus
    console.group('Manual Scenario B: Single Bonus');
    const manualBResult = testManualPayrollScenario(7, 5, 2.50, true);
    totalTests += manualBResult.total;
    passedTests += manualBResult.passed;
    failedTests = failedTests.concat(manualBResult.failed);
    console.groupEnd();
    
    // Scenario C: Multiple Bonuses
    console.group('Manual Scenario C: Multiple Bonuses');
    const manualCResult = testManualPayrollScenario(25, 5, 2.50, true);
    totalTests += manualCResult.total;
    passedTests += manualCResult.passed;
    failedTests = failedTests.concat(manualCResult.failed);
    console.groupEnd();
    
    const successRate = (passedTests / totalTests) * 100;
    console.log(`\n📋 Payroll System Test Results:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests}`);
    console.log(`   Failed: ${failedTests.length}`);
    console.log(`   Success Rate: ${successRate.toFixed(2)}%`);
    
    if (failedTests.length > 0) {
        console.warn('\n❌ FAILED PAYROLL TESTS:');
        failedTests.forEach(fail => {
            console.warn(`   ${fail.scenario}: ${fail.description}`);
        });
    }
    
    console.groupEnd();
    return { passed: passedTests, total: totalTests, failed: failedTests, successRate: successRate };
}

function testAutomaticPayrollScenario(peakLessons, maxLessonsPerInstructor, avgRate) {
    // Set up automatic payroll mode
    const toggle = document.getElementById('payrollModeToggle');
    if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event('change'));
    }
    
    // Set test values
    document.getElementById('maxLessonsPerInstructor').value = maxLessonsPerInstructor;
    document.getElementById('avgInstructorRate').value = avgRate;
    document.getElementById('phase4Lessons').value = peakLessons;
    
    const results = performCalculations();
    const instructors = getInstructorsData();
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    // Test 1: Recommended hires calculation
    totalTests++;
    const expectedHires = Math.ceil(peakLessons / maxLessonsPerInstructor);
    const actualHires = instructors.length;
    
    if (expectedHires === actualHires) {
        passedTests++;
        console.log(`✅ Recommended hires: PASS (Expected: ${expectedHires}, Actual: ${actualHires})`);
    } else {
        failedTests.push({
            scenario: 'Automatic Payroll',
            description: `Recommended hires mismatch - Expected: ${expectedHires}, Actual: ${actualHires}`
        });
        console.warn(`❌ Recommended hires: FAIL (Expected: ${expectedHires}, Actual: ${actualHires})`);
    }
    
    // Test 2: Total payroll cost calculation
    totalTests++;
    const workableWeeksPerYear = parseFloat(document.getElementById('workableWeeksPerYear').value) || 50;
    const weeksPerMonth = workableWeeksPerYear / 12;
    
    let expectedTotalPayroll = 0;
    for (let i = 0; i < expectedHires; i++) {
        let lessonsPerInstructor;
        if (i < expectedHires - 1) {
            lessonsPerInstructor = maxLessonsPerInstructor;
        } else {
            const totalLessonsAssigned = (expectedHires - 1) * maxLessonsPerInstructor;
            lessonsPerInstructor = Math.max(0, peakLessons - totalLessonsAssigned);
        }
        expectedTotalPayroll += lessonsPerInstructor * weeksPerMonth * avgRate;
    }
    
    const actualTotalPayroll = results.totalPayrollCost;
    const payrollDifference = Math.abs(expectedTotalPayroll - actualTotalPayroll);
    const payrollPercentDifference = (payrollDifference / expectedTotalPayroll) * 100;
    
    if (payrollPercentDifference <= 1) { // 1% tolerance
        passedTests++;
        console.log(`✅ Total payroll cost: PASS (${payrollPercentDifference.toFixed(3)}% diff)`);
    } else {
        failedTests.push({
            scenario: 'Automatic Payroll',
            description: `Payroll cost mismatch - Expected: $${expectedTotalPayroll.toLocaleString()}, Actual: $${actualTotalPayroll.toLocaleString()}`
        });
        console.warn(`❌ Total payroll cost: FAIL (${payrollPercentDifference.toFixed(3)}% diff)`);
    }
    
    return { passed: passedTests, total: totalTests, failed: failedTests };
}

function testManualPayrollScenario(lessonsPerWeek, bonusThreshold, bonusAmount, shouldGetBonus) {
    // Set up manual payroll mode
    const toggle = document.getElementById('payrollModeToggle');
    if (toggle) {
        toggle.checked = false;
        toggle.dispatchEvent(new Event('change'));
    }
    
    // Clear existing instructors
    const container = document.getElementById('instructorsContainer');
    if (container) {
        container.innerHTML = '';
    }
    
    // Add test instructor
    addInstructor();
    const instructorDiv = container.lastElementChild;
    if (instructorDiv) {
        const inputs = instructorDiv.querySelectorAll('input');
        if (inputs.length >= 5) {
            inputs[0].value = 'Test Instructor';
            inputs[1].value = lessonsPerWeek;
            inputs[2].value = 25; // baseline rate
            inputs[3].value = bonusThreshold;
            inputs[4].value = bonusAmount;
        }
    }
    
    const results = performCalculations();
    const instructors = getInstructorsData();
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    if (instructors.length > 0) {
        const instructor = instructors[0];
        
        // Test 1: Effective hourly rate calculation
        totalTests++;
        let expectedRate = 25; // baseline rate
        if (shouldGetBonus) {
            const bonusIncrements = Math.floor(lessonsPerWeek / bonusThreshold);
            expectedRate = 25 + (bonusIncrements * bonusAmount);
        }
        
        const actualRate = instructor.effectiveHourlyRate;
        const rateDifference = Math.abs(expectedRate - actualRate);
        
        if (rateDifference < 0.01) {
            passedTests++;
            console.log(`✅ Effective hourly rate: PASS (Expected: $${expectedRate}, Actual: $${actualRate})`);
        } else {
            failedTests.push({
                scenario: 'Manual Payroll',
                description: `Effective rate mismatch - Expected: $${expectedRate}, Actual: $${actualRate}`
            });
            console.warn(`❌ Effective hourly rate: FAIL (Expected: $${expectedRate}, Actual: $${actualRate})`);
        }
        
        // Test 2: Monthly pay calculation
        totalTests++;
        const workableWeeksPerYear = parseFloat(document.getElementById('workableWeeksPerYear').value) || 50;
        const weeksPerMonth = workableWeeksPerYear / 12;
        const expectedMonthlyPay = lessonsPerWeek * weeksPerMonth * expectedRate;
        const actualMonthlyPay = instructor.monthlyPay;
        const payDifference = Math.abs(expectedMonthlyPay - actualMonthlyPay);
        const payPercentDifference = (payDifference / expectedMonthlyPay) * 100;
        
        if (payPercentDifference <= 1) { // 1% tolerance
            passedTests++;
            console.log(`✅ Monthly pay: PASS (${payPercentDifference.toFixed(3)}% diff)`);
        } else {
            failedTests.push({
                scenario: 'Manual Payroll',
                description: `Monthly pay mismatch - Expected: $${expectedMonthlyPay.toLocaleString()}, Actual: $${actualMonthlyPay.toLocaleString()}`
            });
            console.warn(`❌ Monthly pay: FAIL (${payPercentDifference.toFixed(3)}% diff)`);
        }
    }
    
    return { passed: passedTests, total: totalTests, failed: failedTests };
}

function testTimeframeSwitchingConsistency() {
    console.group('⏰ TEST PROTOCOL 3: Timeframe Switching & UI Consistency');
    console.log('Testing mathematical consistency across Weekly, Monthly, and Yearly views');
    
    // Set baseline inputs
    setBaselineTestInputs();
    
    const results = performCalculations();
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    // Store baseline monthly values
    const baselineMonthly = {
        revenue: results.totalMonthlyRevenue,
        netIncome: results.netMonthlyIncome,
        payroll: results.totalPayrollCost
    };
    
    console.log('\n📊 Baseline Monthly Values:');
    console.log(`   Revenue: $${baselineMonthly.revenue.toLocaleString()}`);
    console.log(`   Net Income: $${baselineMonthly.netIncome.toLocaleString()}`);
    console.log(`   Payroll: $${baselineMonthly.payroll.toLocaleString()}`);
    
    // Test Weekly View
    console.group('\n📅 Testing Weekly View');
    const weeklyTests = testTimeframeView('weekly', baselineMonthly, 4.33);
    totalTests += weeklyTests.total;
    passedTests += weeklyTests.passed;
    failedTests = failedTests.concat(weeklyTests.failed);
    console.groupEnd();
    
    // Test Yearly View
    console.group('\n📅 Testing Yearly View');
    const yearlyTests = testTimeframeView('yearly', baselineMonthly, 12);
    totalTests += yearlyTests.total;
    passedTests += yearlyTests.passed;
    failedTests = failedTests.concat(yearlyTests.failed);
    console.groupEnd();
    
    const successRate = (passedTests / totalTests) * 100;
    console.log(`\n📋 Timeframe Consistency Results:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests}`);
    console.log(`   Failed: ${failedTests.length}`);
    console.log(`   Success Rate: ${successRate.toFixed(2)}%`);
    
    if (failedTests.length > 0) {
        console.warn('\n❌ FAILED TIMEFRAME TESTS:');
        failedTests.forEach(fail => {
            console.warn(`   ${fail.timeframe} - ${fail.metric}: ${fail.percentDifference.toFixed(3)}% difference`);
        });
    }
    
    console.groupEnd();
    return { passed: passedTests, total: totalTests, failed: failedTests, successRate: successRate };
}

function testTimeframeView(timeframe, baselineMonthly, multiplier) {
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    // Switch to the target timeframe
    switchMetricsTimeframe(timeframe);
    
    // Get displayed values from DOM
    const displayedRevenue = parseFloat(document.getElementById('grossRevenue').textContent.replace(/[$,]/g, ''));
    const displayedNetIncome = parseFloat(document.getElementById('netIncome').textContent.replace(/[$,]/g, ''));
    
    // Calculate expected values
    const expectedRevenue = baselineMonthly.revenue / multiplier;
    const expectedNetIncome = baselineMonthly.netIncome / multiplier;
    
    // Test revenue consistency
    totalTests++;
    const revenueDifference = Math.abs(displayedRevenue - expectedRevenue);
    const revenuePercentDifference = (revenueDifference / expectedRevenue) * 100;
    
    if (revenuePercentDifference <= 1) { // 1% tolerance
        passedTests++;
        console.log(`✅ Revenue consistency: PASS (${revenuePercentDifference.toFixed(3)}% diff)`);
    } else {
        failedTests.push({
            timeframe: timeframe,
            metric: 'Revenue',
            percentDifference: revenuePercentDifference
        });
        console.warn(`❌ Revenue consistency: FAIL (${revenuePercentDifference.toFixed(3)}% diff)`);
        console.warn(`   Expected: $${expectedRevenue.toLocaleString()}, Displayed: $${displayedRevenue.toLocaleString()}`);
    }
    
    // Test net income consistency
    totalTests++;
    const incomeDifference = Math.abs(displayedNetIncome - expectedNetIncome);
    const incomePercentDifference = (incomeDifference / expectedNetIncome) * 100;
    
    if (incomePercentDifference <= 1) { // 1% tolerance
        passedTests++;
        console.log(`✅ Net income consistency: PASS (${incomePercentDifference.toFixed(3)}% diff)`);
    } else {
        failedTests.push({
            timeframe: timeframe,
            metric: 'Net Income',
            percentDifference: incomePercentDifference
        });
        console.warn(`❌ Net income consistency: FAIL (${incomePercentDifference.toFixed(3)}% diff)`);
        console.warn(`   Expected: $${expectedNetIncome.toLocaleString()}, Displayed: $${displayedNetIncome.toLocaleString()}`);
    }
    
    return { passed: passedTests, total: totalTests, failed: failedTests };
}

function testEdgeCasesAndModules() {
    console.group('🔍 TEST PROTOCOL 4: Edge Cases & Other Modules');
    console.log('Testing fees, royalties, growth alignment warnings, and zero-value stability');
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    // Test Fees & Royalties
    console.group('\n💰 Testing Fees & Royalties');
    const feesResult = testFeesAndRoyalties();
    totalTests += feesResult.total;
    passedTests += feesResult.passed;
    failedTests = failedTests.concat(feesResult.failed);
    console.groupEnd();
    
    // Test Growth Alignment Warning
    console.group('\n⚠️ Testing Growth Alignment Warning');
    const growthResult = testGrowthAlignmentWarning();
    totalTests += growthResult.total;
    passedTests += growthResult.passed;
    failedTests = failedTests.concat(growthResult.failed);
    console.groupEnd();
    
    // Test Zero-Value Stability
    console.group('\n🔢 Testing Zero-Value Stability');
    const zeroResult = testZeroValueStability();
    totalTests += zeroResult.total;
    passedTests += zeroResult.passed;
    failedTests = failedTests.concat(zeroResult.failed);
    console.groupEnd();
    
    const successRate = (passedTests / totalTests) * 100;
    console.log(`\n📋 Edge Cases & Modules Results:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests}`);
    console.log(`   Failed: ${failedTests.length}`);
    console.log(`   Success Rate: ${successRate.toFixed(2)}%`);
    
    if (failedTests.length > 0) {
        console.warn('\n❌ FAILED EDGE CASE TESTS:');
        failedTests.forEach(fail => {
            console.warn(`   ${fail.module}: ${fail.description}`);
        });
    }
    
    console.groupEnd();
    return { passed: passedTests, total: totalTests, failed: failedTests, successRate: successRate };
}

function testFeesAndRoyalties() {
    // Set test values
    document.getElementById('pricePerLesson').value = 100;
    document.getElementById('phase1Lessons').value = 100;
    document.getElementById('royaltyFeeRate').value = 10;
    document.getElementById('ccFeeRate').value = 5;
    
    const results = performCalculations();
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    // Test royalty fee calculation
    totalTests++;
    const expectedRoyaltyFee = 100000 * 0.10; // $100k revenue * 10%
    const actualRoyaltyFee = results.royaltyFee;
    
    if (Math.abs(expectedRoyaltyFee - actualRoyaltyFee) < 0.01) {
        passedTests++;
        console.log(`✅ Royalty fee calculation: PASS`);
    } else {
        failedTests.push({
            module: 'Fees & Royalties',
            description: `Royalty fee mismatch - Expected: $${expectedRoyaltyFee}, Actual: $${actualRoyaltyFee}`
        });
        console.warn(`❌ Royalty fee calculation: FAIL`);
    }
    
    // Test credit card fee calculation
    totalTests++;
    const expectedCCFee = 100000 * 0.05; // $100k revenue * 5%
    const actualCCFee = results.creditCardFee;
    
    if (Math.abs(expectedCCFee - actualCCFee) < 0.01) {
        passedTests++;
        console.log(`✅ Credit card fee calculation: PASS`);
    } else {
        failedTests.push({
            module: 'Fees & Royalties',
            description: `Credit card fee mismatch - Expected: $${expectedCCFee}, Actual: $${actualCCFee}`
        });
        console.warn(`❌ Credit card fee calculation: FAIL`);
    }
    
    return { passed: passedTests, total: totalTests, failed: failedTests };
}

function testGrowthAlignmentWarning() {
    // Set up scenario where marketing generates more students than lesson plan can support
    document.getElementById('phase1Lessons').value = 20; // Low lesson capacity
    document.getElementById('monthlyAdSpend').value = 10000; // High ad spend
    document.getElementById('leadConversionRate').value = 50; // High conversion rate
    
    const results = performCalculations();
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    // Test if warning is triggered
    totalTests++;
    if (results.growthAlignmentWarning && results.growthAlignmentWarning.isTriggered) {
        passedTests++;
        console.log(`✅ Growth alignment warning triggered: PASS`);
    } else {
        failedTests.push({
            module: 'Growth Alignment',
            description: 'Warning not triggered when it should be'
        });
        console.warn(`❌ Growth alignment warning triggered: FAIL`);
    }
    
    // Test recommended ad spend calculation
    totalTests++;
    const costPerLead = 25;
    const plannedLessonCapacity = results.averageLessonsPerMonth;
    const requiredStudents = plannedLessonCapacity / 4; // 4 lessons per student
    const requiredLeads = requiredStudents / (50 / 100); // 50% conversion rate
    const expectedRecommendedAdSpend = requiredLeads * costPerLead;
    
    const actualRecommendedAdSpend = results.growthAlignmentWarning.recommendedAdSpend;
    const adSpendDifference = Math.abs(expectedRecommendedAdSpend - actualRecommendedAdSpend);
    const adSpendPercentDifference = (adSpendDifference / expectedRecommendedAdSpend) * 100;
    
    if (adSpendPercentDifference <= 5) { // 5% tolerance
        passedTests++;
        console.log(`✅ Recommended ad spend calculation: PASS (${adSpendPercentDifference.toFixed(3)}% diff)`);
    } else {
        failedTests.push({
            module: 'Growth Alignment',
            description: `Recommended ad spend mismatch - Expected: $${expectedRecommendedAdSpend}, Actual: $${actualRecommendedAdSpend}`
        });
        console.warn(`❌ Recommended ad spend calculation: FAIL (${adSpendPercentDifference.toFixed(3)}% diff)`);
    }
    
    return { passed: passedTests, total: totalTests, failed: failedTests };
}

function testZeroValueStability() {
    // Set all numerical inputs to 0
    const inputIds = [
        'pricePerLesson', 'phase1Lessons', 'phase2Lessons', 'phase3Lessons', 'phase4Lessons',
        'fixedRent', 'taxes', 'insurance', 'utilities', 'software', 'cleaning', 'maintenance', 'otherCostValue',
        'royaltyFeeRate', 'ccFeeRate', 'monthlyAdSpend', 'leadConversionRate',
        'generalInflationRate', 'priceIncreaseRate', 'payrollIncreaseRate', 'opCostIncreaseRate',
        'sp500Rate', 'cdRate', 'workableWeeksPerYear', 'initialInvestment',
        'medalBallRevenue', 'medalBallCost', 'showcaseRevenue', 'showcaseCost',
        'danceORamaRevenue', 'danceORamaCost', 'otherEventsRevenue', 'otherEventsCost',
        'maxLessonsPerInstructor', 'avgInstructorRate'
    ];
    
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = 0;
        }
    });
    
    const results = performCalculations();
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = [];
    
    // Test that no values are NaN, undefined, or Infinity
    const resultKeys = Object.keys(results);
    resultKeys.forEach(key => {
        totalTests++;
        const value = results[key];
        
        if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
            passedTests++;
            console.log(`✅ ${key}: PASS (${value})`);
        } else {
            failedTests.push({
                module: 'Zero-Value Stability',
                description: `${key} is ${value} (should be a finite number)`
            });
            console.warn(`❌ ${key}: FAIL (${value})`);
        }
    });
    
    return { passed: passedTests, total: totalTests, failed: failedTests };
}

function generateTestSummaryReport(results) {
    console.group('📊 COMPREHENSIVE TEST SUITE SUMMARY REPORT');
    console.log('='.repeat(60));
    
    const totalTests = results.timelineValidation.total + 
                     results.payrollSystem.total + 
                     results.timeframeConsistency.total + 
                     results.edgeCases.total;
    
    const totalPassed = results.timelineValidation.passed + 
                      results.payrollSystem.passed + 
                      results.timeframeConsistency.passed + 
                      results.edgeCases.passed;
    
    const overallSuccessRate = (totalPassed / totalTests) * 100;
    
    console.log('\n📋 OVERALL RESULTS:');
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Total Passed: ${totalPassed}`);
    console.log(`   Total Failed: ${totalTests - totalPassed}`);
    console.log(`   Overall Success Rate: ${overallSuccessRate.toFixed(2)}%`);
    
    console.log('\n📊 PROTOCOL BREAKDOWN:');
    console.log(`   1. Timeline Validation: ${results.timelineValidation.passed}/${results.timelineValidation.total} (${results.timelineValidation.successRate.toFixed(2)}%)`);
    console.log(`   2. Payroll System: ${results.payrollSystem.passed}/${results.payrollSystem.total} (${results.payrollSystem.successRate.toFixed(2)}%)`);
    console.log(`   3. Timeframe Consistency: ${results.timeframeConsistency.passed}/${results.timeframeConsistency.total} (${results.timeframeConsistency.successRate.toFixed(2)}%)`);
    console.log(`   4. Edge Cases & Modules: ${results.edgeCases.passed}/${results.edgeCases.total} (${results.edgeCases.successRate.toFixed(2)}%)`);
    
    if (overallSuccessRate >= 95) {
        console.log('\n🎉 EXCELLENT! All systems are functioning correctly.');
    } else if (overallSuccessRate >= 80) {
        console.log('\n⚠️ GOOD with minor issues. Review failed tests for improvements.');
    } else {
        console.log('\n❌ SIGNIFICANT ISSUES DETECTED. Immediate attention required.');
    }
    
    console.log('\n' + '='.repeat(60));
    console.groupEnd();
}

function testPayrollCalculations() {
    console.group('👥 PAYROLL SYSTEM TEST');
    const result = testPayrollSystemDeepDive();
    console.groupEnd();
    return result;
}

function testTimeframeConsistency() {
    console.group('⏰ TIMEFRAME CONSISTENCY TEST');
    const result = testTimeframeSwitchingConsistency();
    console.groupEnd();
    return result;
}

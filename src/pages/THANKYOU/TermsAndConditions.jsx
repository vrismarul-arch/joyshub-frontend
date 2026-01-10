import "./terms.css";

export default function TermsAndConditions() {
  return (
    <div className="terms-page">
      {/* HEADER */}
      <div className="terms-header">
        <h1>TERMS AND CONDITIONS</h1>
      </div>

      {/* CONTENT */}
      <div className="terms-content">

        {/* 1 */}
        <div className="term-item">
          <h3>1. Security Deposit</h3>
          <p>
            The tenant shall pay <b>one month’s rent</b> as a refundable security
            deposit at the time of joining.
          </p>
        </div>

        {/* 2 */}
        <div className="term-item">
          <h3>2. Rent Calculation Period</h3>
          <p>
            Monthly rent will be calculated from the <b>1st day</b> of every month
            to the <b>30th / 31st day</b> of the same month.
          </p>
        </div>

        {/* 3 */}
        <div className="term-item">
          <h3>3. Rent Payment Due Date</h3>
          <p>
            The tenant must pay the monthly rent <b>on or before the 5th</b> of
            every month without fail.
          </p>
        </div>

        {/* 4 */}
        <div className="term-item">
          <h3>4. Lock-in Period</h3>
          <p>
            A <b>minimum lock-in period of three (3) months</b> is mandatory for
            all tenants.
          </p>
        </div>

        {/* 5 */}
        <div className="term-item">
          <h3>5. Notice Period & Refund</h3>
          <p>
            The tenant must provide a <b>one-month prior notice</b> before vacating.
            The security deposit will be refunded at the time of vacating,
            subject to deductions if applicable.
          </p>
        </div>

        {/* 6 */}
        <div className="term-item">
          <h3>6. Prohibited Activities</h3>
          <p>
            Smoking, drinking, drug usage or storage, bringing friends of the
            opposite gender, and any illegal activities are <b>strictly prohibited</b>
            inside the premises.
          </p>
          <p>
            Violation of these rules will lead to <b>immediate termination</b> of
            tenancy without prior notice.
          </p>
        </div>

        {/* 7 */}
        <div className="term-item">
          <h3>7. Visitors Policy</h3>
          <p>
            Staying of visitors including <b>parents or friends</b> is not
            encouraged and requires management approval.
          </p>
        </div>

        {/* 8 */}
        <div className="term-item">
          <h3>8. Violence & Property Damage</h3>
          <p>
            Any form of <b>violent behaviour</b> among housemates will result in
            immediate termination of tenancy.
          </p>
          <p>
            Damages such as breakage, loss of keys, cupboard or room damage will
            be <b>chargeable</b>.
          </p>
        </div>

        {/* 9 */}
        <div className="term-item">
          <h3>9. Deposit Forfeiture</h3>
          <p>
            The security deposit will <b>not be refunded</b> if the tenant fails
            to complete the <b>three-month lock-in period</b> or if tenancy is
            terminated by management due to rule violations.
          </p>
        </div>

        {/* ACCEPTANCE */}
        <p className="accept-text">
          I hereby confirm that I have read, understood, and fully agree to all
          the above mentioned <b>Terms and Conditions</b> of{" "}
          <b>JOY&apos;S HUB HOME STAYS</b>.
        </p>


      </div>
    </div>
  );
}

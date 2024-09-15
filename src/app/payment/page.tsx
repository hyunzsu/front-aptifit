import s from "./PaymentPage.module.css";

export default function PaymentPage() {
  return (
    <main className={s.PaymentPage}>
      <div>
        <h2>결제하기</h2>
        {/* 상품명 섹션 */}
        <div>
          <h3>상품명</h3>
          <p>앱티핏 적성검사 (대학생 버전)</p>
        </div>
        {/* 주문금액 섹션 */}
        <div>
          <h3>주문금액</h3>
          <div>
            <p>상품금액</p>
            <p>19,900 원</p>
          </div>
          <div>
            <p>할인금액</p>
            <p>0 원</p>
          </div>
          <div>
            <p>총결제금액</p>
            <p>19,900 원</p>
          </div>
        </div>
        {/* 쿠폰등록 섹션 */}
        <div>
          <h3>쿠폰 등록</h3>
          <div>
            <input type="text" placeholder="쿠폰 번호" />
            <button>등록</button>
          </div>
        </div>
        {/* 약관동의 섹션 */}
        <div>
          <h3>약관 동의</h3>
          <div>
            <div>
              <input type="checkbox" />
              <p>
                취소, 환불, 소득공제 정책 등 상품 구매 정책에 동의합니다 (필수)
              </p>
            </div>
          </div>
        </div>
        {/* 결제버튼 섹션 */}
        <button>결제하기</button>
      </div>
    </main>
  );
}

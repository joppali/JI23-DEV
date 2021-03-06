import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import HeaderProps from "../../models/HeaderProps";
import Layout from "../../components/shared/Layout";
import * as Yup from "yup";
import Contact from "../../models/Contact";
import { useRouter } from "next/router";
import SNS from "../../models/SNS";
import DevCMS from "../api/DevCMS";
import HeadProps from "../../models/HeadProps";
import ContactForm from "../../components/shared/ContactForm";
import { fetchWrapper } from "../../utils/FetchUtils";

interface Props {
  sns: SNS;
}

const ContactIndex: NextPage<Props> = (props: Props) => {
  const { sns } = props;

  const router = useRouter();

  const headerProps: HeaderProps = {
    title: "Contact",
    subTitle: "お問い合わせ",
    linkProps: { href: "/" },
    imgProps: { src: "/contact.png", alt: "Contact" },
  } as const;

  const headProps: HeadProps = {
    title: "Contact",
    type: "article",
    url: `${router.asPath}`,
  } as const;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("名前は必須項目です"),
    email: Yup.string()
      .email("正しいメールアドレスではありません")
      .required("メールアドレスは必須です"),
    body: Yup.string().required("お問い合わせ内容は必須です。"),
  });

  const handleSubmit = async (contact: Contact): Promise<void> => {
    try {
      await fetchWrapper.post("/api/contact", contact);
      void router.push("/contact/success");
    } catch (err) {
      void router.push("/contact/error");
    }
  };

  return (
    <Layout headProps={headProps} headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.content}>
            <div className={style.contact}>
              <div className={style.title}>
                <h2>お問い合わせフォーム</h2>
              </div>
              <ContactForm
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                sns={sns}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();

  const sns = await devCMS.getSNS();

  return {
    props: {
      sns,
    },
  };
};

export default ContactIndex;

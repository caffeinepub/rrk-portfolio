import {
  ArrowLeft,
  Loader2,
  LogIn,
  LogOut,
  Mail,
  ShieldAlert,
} from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetContactMessages, useIsCallerAdmin } from "../hooks/useQueries";

export default function AdminPage() {
  const { login, clear, isLoggingIn, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();
  const { data: messages, isLoading: isLoadingMessages } =
    useGetContactMessages();

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  function formatTimestamp(ts: bigint) {
    const ms = Number(ts / BigInt(1_000_000));
    return new Date(ms).toLocaleString();
  }

  function handleLinkEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.color = "var(--p-accent)";
  }
  function handleLinkLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.color = "var(--p-muted)";
  }
  function handleCardEnter(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.borderColor = "rgba(110,240,180,0.4)";
  }
  function handleCardLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.borderColor = "rgba(60,60,80,0.5)";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        padding: "40px 60px",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--p-muted)",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              transition: "color 0.2s",
            }}
            onMouseEnter={handleLinkEnter}
            onMouseLeave={handleLinkLeave}
            data-ocid="admin.link"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </a>
          <div
            style={{
              width: "1px",
              height: "20px",
              background: "var(--p-border)",
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "var(--p-text)",
            }}
          >
            Admin <span style={{ color: "var(--p-accent)" }}>Panel</span>
          </div>
        </div>

        {isLoggedIn ? (
          <button
            type="button"
            onClick={clear}
            className="btn btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            data-ocid="admin.secondary_button"
          >
            <LogOut size={14} />
            Logout
          </button>
        ) : (
          <button
            type="button"
            onClick={login}
            disabled={isLoggingIn}
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <LogIn size={14} />
            )}
            {isLoggingIn ? "Connecting..." : "Login"}
          </button>
        )}
      </div>

      {/* Not logged in */}
      {!isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            padding: "80px 40px",
            background: "var(--surface)",
            border: "1px solid var(--p-border)",
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
            maxWidth: "480px",
            margin: "0 auto",
          }}
          data-ocid="admin.panel"
        >
          <div style={{ fontSize: "3rem", marginBottom: "24px" }}>🔐</div>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "var(--p-text)",
              marginBottom: "12px",
            }}
          >
            Authentication Required
          </h2>
          <p
            style={{
              color: "var(--p-muted)",
              marginBottom: "32px",
              lineHeight: 1.7,
            }}
          >
            Login to access the admin dashboard and view contact messages.
          </p>
          <button
            type="button"
            onClick={login}
            disabled={isLoggingIn}
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            data-ocid="admin.open_modal_button"
          >
            {isLoggingIn ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <LogIn size={14} />
            )}
            {isLoggingIn ? "Connecting..." : "Login to Continue"}
          </button>
        </motion.div>
      )}

      {/* Checking admin status */}
      {isLoggedIn && isCheckingAdmin && (
        <div
          style={{
            textAlign: "center",
            padding: "80px",
            color: "var(--p-muted)",
          }}
          data-ocid="admin.loading_state"
        >
          <Loader2
            size={32}
            className="animate-spin"
            style={{ margin: "0 auto 16px" }}
          />
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
            Verifying access level...
          </p>
        </div>
      )}

      {/* Not admin */}
      {isLoggedIn && !isCheckingAdmin && !isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: "center",
            padding: "80px 40px",
            background: "var(--surface)",
            border: "1px solid rgba(180,50,50,0.3)",
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
            maxWidth: "480px",
            margin: "0 auto",
          }}
          data-ocid="admin.error_state"
        >
          <ShieldAlert
            size={48}
            style={{ color: "#e55", margin: "0 auto 20px", display: "block" }}
          />
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "var(--p-text)",
              marginBottom: "12px",
            }}
          >
            Access Denied
          </h2>
          <p style={{ color: "var(--p-muted)", lineHeight: 1.7 }}>
            Your account does not have admin privileges. Contact the site
            administrator.
          </p>
        </motion.div>
      )}

      {/* Admin dashboard */}
      {isLoggedIn && !isCheckingAdmin && isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <Mail size={20} style={{ color: "var(--p-accent)" }} />
            <h3
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--p-text)",
              }}
            >
              Contact Messages
            </h3>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "3px 10px",
                borderRadius: "20px",
                background: "rgba(110,240,180,0.1)",
                color: "var(--p-accent)",
                border: "1px solid rgba(110,240,180,0.3)",
              }}
            >
              {isLoadingMessages ? "..." : `${messages?.length ?? 0} total`}
            </span>
          </div>

          {isLoadingMessages && (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                color: "var(--p-muted)",
              }}
              data-ocid="admin.loading_state"
            >
              <Loader2
                size={28}
                className="animate-spin"
                style={{ margin: "0 auto 12px" }}
              />
              <p
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
              >
                Fetching messages...
              </p>
            </div>
          )}

          {!isLoadingMessages && (!messages || messages.length === 0) && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 40px",
                background: "var(--surface)",
                border: "1px solid var(--p-border)",
                borderRadius: "16px",
                color: "var(--p-muted)",
              }}
              data-ocid="admin.empty_state"
            >
              <Mail size={40} style={{ margin: "0 auto 16px", opacity: 0.4 }} />
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                No messages received yet.
              </p>
            </div>
          )}

          {!isLoadingMessages && messages && messages.length > 0 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={String(msg.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--p-border)",
                    borderRadius: "16px",
                    padding: "28px 32px",
                    backdropFilter: "blur(12px)",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={handleCardEnter}
                  onMouseLeave={handleCardLeave}
                  data-ocid={`admin.item.${idx + 1}`}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "16px",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-head)",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: "var(--p-text)",
                          marginBottom: "4px",
                        }}
                      >
                        {msg.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.8rem",
                          color: "var(--p-accent2)",
                        }}
                      >
                        {msg.email}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--p-muted)",
                        textAlign: "right",
                      }}
                    >
                      {formatTimestamp(msg.timestamp)}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color: "var(--p-accent)",
                      marginBottom: "12px",
                      padding: "6px 14px",
                      display: "inline-block",
                      background: "rgba(110,240,180,0.08)",
                      borderRadius: "20px",
                      border: "1px solid rgba(110,240,180,0.2)",
                    }}
                  >
                    {msg.subject}
                  </div>
                  <p
                    style={{
                      color: "#a0a0c0",
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.message}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
